from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from ..serializers.notifications_serializers import *
from accounts.models import CustomUser
from pets.models import *

class NotificationViewPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = get_object_or_404(CustomUser, id=view.kwargs['pk'])
        if user.username == request.user.username:
            return True
        return False
    
class NotificationListCreateView(ListCreateAPIView):
    pagination_class = PageNumberPagination
    permission_classes = [NotificationViewPermission]
    serializer_class = NotificationSerializer
    
    def perform_create(self, serializer):
        user = get_object_or_404(CustomUser, id=self.kwargs['pk'])
        serializer.save(user=user)

    def get_queryset(self):
        queryset = Notification.objects.filter(user_id = self.kwargs['pk'])
        read = self.request.query_params.get("read")
        if read is not None:
            queryset = queryset.filter(read=read)
        return queryset.order_by('-time_created')

class NotificationGetPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        notification = get_object_or_404(Notification, id=view.kwargs['pk'])
        if notification.user.username == request.user.username:
            return True
        return False
    
class NotificationGetDeleteView(RetrieveDestroyAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [NotificationGetPermission]
    def get_object(self):
        return get_object_or_404(Notification, id=self.kwargs['pk'])