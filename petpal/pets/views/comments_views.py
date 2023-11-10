from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework import authentication, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from ..serializers.comments_serializers import *
from accounts.models import ShelterUser
from pets.models import *

class ShelterCommentReplyCreateView(CreateAPIView):
    serializer_class = ShelterCommentResponseCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        review = get_object_or_404(ShelterComment, id=self.kwargs['pk'])
        serializer.save(review=review, user_from=self.request.user)

class ShelterCommentListCreateView(ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ShelterCommentCreateSerializer
        return ShelterCommentSerializer

    def get_queryset(self):
        return ShelterComment.objects.filter(shelter_id=self.kwargs['pk']).order_by('-time_created')
    
    def perform_create(self, serializer):
        shelter = get_object_or_404(ShelterUser, id=self.kwargs['pk'])
        serializer.save(shelter=shelter, user_from=self.request.user)

class ApplicationPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        application = get_object_or_404(Applications, id=view.kwargs['pk'])
        if application.applicant.username == request.user.username or application.pet_listing.shelter.username == request.user.username:
            return True
        return False

class ApplicationCommentListCreateView(ListCreateAPIView):
    serializer_class = AppCommentCreateSerializer
    permission_classes = [ApplicationPermission]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AppCommentCreateSerializer
        return AppCommentSerializer
    
    def perform_create(self, serializer):
        application = get_object_or_404(Applications, id=self.kwargs['pk'])
        if self.request.user.username == application.applicant.username:
            to = application.pet_listing.shelter
        else: 
            to = application.applicant 
        serializer.save(application=application, user_from=self.request.user, user_to=to)

    def get_queryset(self):
        return ApplicationComment.objects.filter(application_id=self.kwargs['pk']).order_by('-time_created')
    
    
