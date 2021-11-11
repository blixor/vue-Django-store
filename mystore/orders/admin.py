from django.contrib import admin
from .models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'phone_number',
                    'full_address', 'status', 'created_at')


admin.site.register(Order, OrderAdmin)
