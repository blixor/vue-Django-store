from rest_framework import viewsets, status
from rest_framework.response import Response

from .serializers import OrderSerializers
from .models import Order


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializers

    def create(self, request):
        if request.method == 'POST':
            order = request.data.get('order')
            cart = request.data.get('order')['cart']
            
            for i in cart:
                '''
                TODO:
                subtract qty of this order from product inventory
                add star-rating to model rating
                '''
                i.pop('image')

            serializer = self.serializer_class(data=order,
                                               context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
