from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Menu,Cart

class RegisterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password'
        ]       
        
        extra_kward = {
            'password' : {'write_only':True},
        }
        
    def  create(self, validate_data):
        
        user = User.objects.create_user(
            username = validate_data['username'],
            email=validate_data['email'],
            password=validate_data['password'],
        )
        
        return user 
    
class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = "__all__"

class CartSerializer(serializers.ModelSerializer):
    menu_name = serializers.CharField(
        source="menu.name",
        read_only=True
    )

    menu_price = serializers.DecimalField(
        source="menu.price",
        max_digits=8,
        decimal_places=2,
        read_only=True
    )

    menu_image = serializers.URLField(
        source="menu.image",
        read_only=True
    )

    menu_category = serializers.CharField(
        source="menu.category",
        read_only=True
    )

    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart

        fields = [
            "id",
            "menu",
            "menu_name",
            "menu_price",
            "menu_image",
            "menu_category",
            "quantity",
            "total_price",
            "created_at",
        ]

    def get_total_price(self, obj):
        return obj.menu.price * obj.quantity        
