from django.urls import path, include
from rest_framework import routers
from .views import ProductViewSet


router = routers.DefaultRouter()

router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/', include('rest_framework.urls', namespace='rest_framework'))
]
