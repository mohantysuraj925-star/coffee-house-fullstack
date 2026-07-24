from django.contrib import admin
from django.urls import path
from api.views import welcome,register,login,menu_list,menu_detail,my_view,userList,cart_list,cart_detail,admin_cart_list

urlpatterns = [
    path('me/', my_view, name="my_view"),
    path('api/', welcome, name="welcome"),
    path('api/register/', register, name="register"),
    path('api/login/', login, name="login"),
    path('register/', register, name="register_old"),
    path('login/', login, name="login_old"),
    path('menu/', menu_list, name="menu_list"),
    path('users/', userList, name="userList"),
    path('menu-detail/<int:pk>/', menu_detail, name="menu_detail"),
    path("cart/", cart_list, name="cart_list"),
    path("cart/<int:pk>/", cart_detail, name="cart_detail"),
    path("admin/cart/", admin_cart_list, name="admin_cart_list"),
    path('admin/', admin.site.urls),
]
