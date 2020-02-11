from django.urls import path
from django.contrib import admin

from .api import (
    CommentCreateAPIView,
    CommentDetailAPIView,
    CommentListAPIView,
)

app_name = "comments"
urlpatterns = [
	path('', CommentListAPIView.as_view(), name='list'),
    path('<int:pk>/', CommentDetailAPIView.as_view(), name='thread'),
    path('create/', CommentCreateAPIView.as_view(), name='create'),
    # path('<str:slug>/delete/', PostDeleteAPIView.as_view(), name='delete'),
    
    # url(r'^posts/$', "<appname>.views.<function_name>"),
]