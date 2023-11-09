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
    

class ApplicationPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        application = get_object_or_404(Applications, id=view.kwargs['pk'])
        if application.applicant.username == request.user.username or application.pet_listing.shelter.username == request.user.username:
            return True
        return False

class ApplicationCommentCreateView(CreateAPIView):
    serializer_class = AppCommentCreateSerializer
    permission_classes = [ApplicationPermission]

    def perform_create(self, serializer):
        application = get_object_or_404(Applications, id=self.kwargs['pk'])
        if self.request.user.username == application.applicant.username:
            to = application.pet_listing.shelter
        else: 
            to = application.applicant 
        serializer.save(application=application, user_from=self.request.user, user_to=to)
    
class ApplicationCommentListView(ListAPIView):
    serializer_class = AppCommentSerializer
    permission_classes = [ApplicationPermission]
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return ApplicationComment.objects.filter(application_id=self.kwargs['pk']).order_by('-time_created')
    
