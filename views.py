from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Menu, Cart

@api_view(['POST', 'PUT'])
def update_cart(request):
    menu_id = request.data.get('menu')
    quantity = int(request.data.get('quantity', 1))
    
    menu_item = get_object_or_404(Menu, id=menu_id)
    cart_item, created = Cart.objects.get_or_create(user=request.user, menu=menu_item)

    # Quantity <= 0 hone par DATABASE se hard delete karein
    if quantity <= 0:
        cart_item.delete()
        return Response({"message": "Item removed"}, status=status.HTTP_200_OK)

    # FIX: += ko hata kar direct = (ASSIGNMENT) kiya hai
    cart_item.quantity = quantity
    cart_item.save()
    return Response({"message": "Cart updated"}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_cart_item(request, pk):
    # Menu ID aur Cart Primary Key dono se filter karke delete karein
    Cart.objects.filter(user=request.user, menu_id=pk).delete()
    Cart.objects.filter(user=request.user, id=pk).delete()
    return Response({"message": "Item deleted"}, status=status.HTTP_204_NO_CONTENT)
