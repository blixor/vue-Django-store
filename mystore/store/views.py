from rest_framework import viewsets

from .serializers import ProductSerializer
from .models import Product


# Get all products in random order
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('?')
    serializer_class = ProductSerializer
