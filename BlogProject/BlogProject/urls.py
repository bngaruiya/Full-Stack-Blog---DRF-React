from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("frontend.urls")),
    path('api/posts/', include("posts.urls")),
    path('comments/', include("comments.urls")),
    path('api/auth/', include("accounts.urls")),
]
