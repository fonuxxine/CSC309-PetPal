from rest_framework.serializers import ModelSerializer
from ..models import Notification

# might need more than one serializer if you need different fields for different views

class NotificationSerializer(ModelSerializer):
    pass