from rest_framework.serializers import ModelSerializer, DateTimeField, PrimaryKeyRelatedField, BooleanField
from ..models import Notification

class NotificationSerializer(ModelSerializer):
    read = BooleanField(read_only=True)
    user = PrimaryKeyRelatedField(read_only=True)
    time_created = DateTimeField(read_only=True)
    class Meta:
        model = Notification
        fields = '__all__'
