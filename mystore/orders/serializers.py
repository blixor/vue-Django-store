from .models import Order
from rest_framework import serializers


class OrderSerializers(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['cart', 'first_name', 'last_name', 'email', 'phone',
                  'address', 'city', 'state', 'zipcode','subtotal', 'tax', 'total']
