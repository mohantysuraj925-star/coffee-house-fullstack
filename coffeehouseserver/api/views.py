from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from api.serializers import RegisterSerializer, MenuSerializer,CartSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from api.models import Menu,Cart
from .permissions import IsSuperuser
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# Create your views here.
@api_view(['GET'])
def welcome(request):
    return Response("Welcome to events apis...")

@api_view(['GET'])
@permission_classes([IsSuperuser])
def my_view(request):
    return Response({"message": "Welcome Admin"})

@api_view(['GET'])
def userList(request):
    users = User.objects.all().values(
        'id',
        'username',
        'email',
        'is_superuser',
        'is_staff',
        'is_active',
        'date_joined'
    )

    return Response(list(users))

@api_view(['POST'])
def register(request):
    
    serData = RegisterSerializer(data=request.data)
    
    if(serData.is_valid()):
        serData.save()
        
        return Response({
            "message":"Regsiter Successfully",
            "user":serData.data
        })
        
    return Response(serData.errors)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(
        username=username,
        password=password
    )
    
    if user:
       
       token, created = Token.objects.get_or_create(user=user) 
       
       return Response({
           "token":token.key,
           "username":user.username,
           "is_superuser": user.is_superuser
       })
    
    return Response({
        "message":"Invalid Cred"
    })
   
@api_view(['GET', 'POST'])
def menu_list(request):

    if request.method == 'GET':
        menus = Menu.objects.all()
        serializer = MenuSerializer(menus, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = MenuSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)
    
@api_view(['GET', 'PUT', 'DELETE'])
def menu_detail(request, pk):

    try:
        menu = Menu.objects.get(id=pk)
    except Menu.DoesNotExist:
        return Response({"message": "Menu not found"})

    if request.method == 'GET':
        serializer = MenuSerializer(menu)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = MenuSerializer(menu, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    elif request.method == 'DELETE':
        menu.delete()
        return Response({"message": "Menu deleted successfully"})    


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated]) 
def cart_list(request):

    if request.method == "GET":

        carts = Cart.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = CartSerializer(
            carts,
            many=True
        )

        return Response(serializer.data)


    elif request.method == "POST":

        menu_id = request.data.get("menu")
        quantity = int(request.data.get("quantity", 1))

        try:
            menu = Menu.objects.get(id=menu_id)
        except Menu.DoesNotExist:
            return Response(
                {
                    "message": "Menu item not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        if not menu.is_available:
            return Response(
                {
                    "message": "This item is currently unavailable"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_item, created = Cart.objects.get_or_create(
            user=request.user,
            menu=menu,
            defaults={
                "quantity": quantity
            }
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = CartSerializer(cart_item)

        return Response({
            "message": "Item added to cart",
            "cart": serializer.data
        })        

@api_view(["PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def cart_detail(request, pk):

    try:
        cart = Cart.objects.get(
            id=pk,
            user=request.user
        )

    except Cart.DoesNotExist:

        return Response(
            {
                "message": "Cart item not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "PUT":

        quantity = int(
            request.data.get("quantity", 1)
        )

        if quantity < 1:
            return Response(
                {
                    "message": "Quantity must be at least 1"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        cart.quantity = quantity
        cart.save()

        serializer = CartSerializer(cart)

        return Response({
            "message": "Cart updated successfully",
            "cart": serializer.data
        })


    elif request.method == "DELETE":

        cart.delete()

        return Response({
            "message": "Item removed from cart"
        })        
        
@api_view(["GET"])
@permission_classes([IsSuperuser])
def admin_cart_list(request):

    carts = Cart.objects.select_related(
        "user",
        "menu"
    ).all().order_by("-created_at")

    data = []

    for cart in carts:
        data.append({
            "id": cart.id,

            "user": {
                "id": cart.user.id,
                "username": cart.user.username,
                "email": cart.user.email,
            },

            "menu": {
                "id": cart.menu.id,
                "name": cart.menu.name,
                "category": cart.menu.category,
                "price": cart.menu.price,
                "image": cart.menu.image,
            },

            "quantity": cart.quantity,

            "total_price": cart.menu.price * cart.quantity,

            "created_at": cart.created_at,
        })

    return Response(data)        

