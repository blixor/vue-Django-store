from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('', include('store.urls'), name='home'),
    path('users/', include('users.urls'), name='users'),
    path('orders/', include('orders.urls'), name='orders'),
    path('admin/', admin.site.urls),
    path('api/password_reset/',
        include('django_rest_passwordreset.urls', namespace='password_reset'))
]
