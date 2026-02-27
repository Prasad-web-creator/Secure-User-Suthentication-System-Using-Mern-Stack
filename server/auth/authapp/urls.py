
from django.urls import path
from .views import register,login,reset_password,verify_otp,change_password,get_otp

urlpatterns = [
    path('register/',register),
    path('login/',login),
    path('reset/',reset_password),
    path('verify/',verify_otp),
    path('change/',change_password),
    path('getotp/',get_otp),
] 