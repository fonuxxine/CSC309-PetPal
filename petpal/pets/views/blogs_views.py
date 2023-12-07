from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView

from pets.models import *
from accounts.models import ShelterUser
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from ..serializers.blog_serializers import *

class BlogResultsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 10


class IsShelterLoggedIn(permissions.BasePermission):
    def has_permission(self, request, view):
        shelter_user = get_object_or_404(ShelterUser, id=view.kwargs["shelter_id"])
        if request.user.id == shelter_user.id:
            return True
        return False

class BlogCreateView(CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticated, IsShelterLoggedIn]

    def perform_create(self, serializer):
        shelter = get_object_or_404(ShelterUser, id=self.kwargs["shelter_id"])
        serializer.save(shelter=shelter)

class BlogListView(ListAPIView):
    serializer_class = BlogSerializer
    pagination_class = BlogResultsPagination

    def get_queryset(self):
        shelter = get_object_or_404(ShelterUser, id=self.kwargs["shelter_id"])
        queryset = Blog.objects.all().filter(shelter=shelter)
        return queryset

class BlogGetView(RetrieveAPIView):
    serializer_class = BlogSerializer

    def get_object(self):
        return get_object_or_404(Blog, id=self.kwargs["blog_id"])



    