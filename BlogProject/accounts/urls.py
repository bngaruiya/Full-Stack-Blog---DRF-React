from django.urls import path
from django.contrib import admin

from .api import (
    UserCreateAPiView,
    UserLoginAPIView,
)

app_name = "accounts"
urlpatterns = [
	path('register/', UserCreateAPiView.as_view(), name='register'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
]