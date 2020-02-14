from django.db.models import Q
from django.contrib.auth.models import User

from rest_framework.response import Response

from rest_framework.generics import (
    GenericAPIView,
    RetrieveAPIView
    )
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)
from knox.models import AuthToken

from posts.permissions import IsOwnerOrReadOnly
from .serializers import (
    UserCreateSerializer,
    UserLoginSerializer,
    UserDetailSerializer,
    )

class UserCreateAPiView(GenericAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserDetailSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })

class UserLoginAPIView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            'user': UserDetailSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })

# Get User Api
class UserApi(RetrieveAPIView):
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = UserDetailSerializer

    def get_object(self):
        return self.request.user