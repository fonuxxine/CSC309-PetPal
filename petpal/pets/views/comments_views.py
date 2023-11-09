from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework import authentication, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from ..serializers.comments_serializers import *
from accounts.models import ShelterUser
from pets.models import *

class ShelterCommentCreateView(CreateAPIView):
    serializer_class = ShelterCommentCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        shelter = get_object_or_404(ShelterUser, id=self.kwargs['pk'])
        serializer.save(shelter=shelter, user_from=self.request.user)

class ShelterCommentListView(ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ShelterCommentSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return ShelterComment.objects.filter(shelter_id=self.kwargs['pk']).order_by('-time_created')
    