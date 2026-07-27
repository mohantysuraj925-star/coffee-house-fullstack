from django.contrib import admin

# Register your models here.

from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'customer_name', 'total_amount', 'payment_status', 'created_at')
