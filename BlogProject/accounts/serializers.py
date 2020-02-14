from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Q

from rest_framework.serializers import (
    CharField,
    EmailField,
    ModelSerializer,
    HyperlinkedIdentityField,
    Serializer,
    SerializerMethodField,
    ValidationError,
)

User._meta.get_field('email')._unique = True

class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
        ]

class UserCreateSerializer(ModelSerializer):
    email = EmailField(label = 'Email Address')
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
        ]

        extra_kwargs = {"password": 
                            {"write_only": True}
                        }

    def create(self, validated_data):
        username = validated_data["username"]
        email = validated_data["email"]
        password = validated_data["password"]
        if email and User.objects.filter(email=email).exists():
            raise ValidationError('A user with that email already exists')
        user = User.objects.create_user(username, email, password)
        return user

class UserLoginSerializer(ModelSerializer):
    token = CharField(allow_blank=True, read_only=True)
    username = CharField(required=False, allow_blank=True)
    email = EmailField(label = 'Email Address', required=False, allow_blank=True)
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'token',
        ]
        extra_kwargs = {"password": 
                            {"write_only": True}
                        }

    def validate(self, data):
        user_obj = None
        email = data.get("email", None)
        username = data.get("username", None)
        password = data["password"]
        if not email and not username:
            raise ValidationError("A username or Email is required to login.")
        user = User.objects.filter(
            Q(email=email) |
            Q(username=username)
        ).distinct()
        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise ValidationError("Incorrect Credentials.")
        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError("Incorrect Credentials. Please try again.")
        
        return user_obj