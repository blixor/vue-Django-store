from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url


urlpatterns = [
    path('', include('store.urls'), name='home'),
    path('users/', include('users.urls'), name='users'),
    path('admin/', admin.site.urls),
    url(r'api/password_reset/',
        include('django_rest_passwordreset.urls', namespace='password_reset'))
]
