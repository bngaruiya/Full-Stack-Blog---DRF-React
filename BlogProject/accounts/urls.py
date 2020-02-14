from django.urls import path, include
from knox import views as knox_views
from django.contrib import admin

from .api import (
    UserCreateAPiView,
    UserLoginAPIView,
    UserApi,
)

app_name = "accounts"
urlpatterns = [
    path('', include('knox.urls')),
	path('register', UserCreateAPiView.as_view(), name='register'),
    path('login', UserLoginAPIView.as_view(), name='login'),
    path('user', UserApi.as_view(), name='user'),
    path('logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]