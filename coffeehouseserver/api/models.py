from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Menu(models.Model):
    CATEGORY_CHOICES = (
        ('Coffee', 'Coffee'),
        ('Tea', 'Tea'),
        ('Snack', 'Snack'),
        ('Dessert', 'Dessert'),
        ('Other', 'Other'),
    )

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.URLField(blank=True, null=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Cart(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="cart_items"
    )

    menu = models.ForeignKey(
        Menu,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(default=1)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.menu.name}"    
    
class Order(models.Model):
    order_id = models.CharField(max_length=100, unique=True)
    customer_name = models.CharField(max_length=100)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=20, default="Completed")
    payment_method = models.CharField(max_length=50, default="UPI (Demo)")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_id} - {self.customer_name}"
