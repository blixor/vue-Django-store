from django.http.response import Http404
from django.contrib.auth.models import User

from rest_framework import status, authentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken

from .models import Profile

from .serializers import UserSerializer, ProfileSerializer, ChangePasswordSerializer


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        data = ({'token': token.key, 'user_id': user.pk, 'email': user.email, 'username': user.username,
                'address': user.profile.address, 'city': user.profile.city, 'state': user.profile.state, 'zipcode': user.profile.zipcode,
                'first_name': user.first_name, 'last_name': user.last_name, 'phone': user.profile.phone, 'staff': user.is_staff})
        return Response(data=data, status=status.HTTP_200_OK)


class RegisterUser(APIView):
    '''
    Register new user
    '''
    serializer_class = UserSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_202_ACCEPTED)


class UpdateProfile(APIView):
    '''
    Get and Update user Profile.
    '''
    serializer_class = ProfileSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def get_object(self, pk):
        try:
            return Profile.objects.get(user=pk)
        except Profile.DoesNotExist:
            raise Http404

    def patch(self, request, pk, format=None):
        if request.user.is_authenticated:
            profile = self.get_object(pk)
            serializer = self.serializer_class(profile, data=request.data,
                                               context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class UpdateUser(APIView):
    '''
    Deactivate user and change password
    '''
    permission_classes = [IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]

    def get_object(self, pk):
        try:
            return User.objects.get(id=pk)
        except User.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        old_password = request.data.get("old_password")
        password = request.data.get("password")
        password2 = request.data.get('password2')
        serializer = ChangePasswordSerializer(user, data=request.data)

        if serializer.is_valid():
            # validate passwords
            if password != password2:
                return Response({"password": "Password fields didn't match."},
                                status=status.HTTP_400_BAD_REQUEST)

            # check old_password
            if not user.check_password(old_password):
                return Response({"old_password": "Wrong password."},
                                status=status.HTTP_400_BAD_REQUEST)

            # set_password also hashes the password that the user will get
            user.set_password(password)
            user.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Deactivate user
    def post(self, request, pk, format=None):
        user = self.get_object(pk)

        # check old_password
        password = request.data.get("password")

        if not user.check_password(password):
            return Response({"password": "Wrong password."},
                            status=status.HTTP_400_BAD_REQUEST)

        request.user.is_active = False
        request.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
