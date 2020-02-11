from django.urls import path
from django.contrib import admin

from .api import (
    PostCreateAPIView,
    PostListAPIView,
    PostDetailAPIView,
    PostUpdateAPIView,
    PostDeleteAPIView
)

from .views import (
    post_create
)

app_name = "posts"
urlpatterns = [
	path('', PostListAPIView.as_view(), name='list'),
    path('create/', PostCreateAPIView.as_view(), name='create'),
    path('<str:slug>/', PostDetailAPIView.as_view(), name='detail'),
    path('<str:slug>/delete/', PostDeleteAPIView.as_view(), name='delete'),
    path('<str:slug>/edit/', PostUpdateAPIView.as_view(), name='update'),
    
    # url(r'^posts/$', "<appname>.views.<function_name>"),
]