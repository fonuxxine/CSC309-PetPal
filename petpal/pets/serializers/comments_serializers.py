from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from ..models import ShelterComment, ApplicationComment

# might need more than one serializer if you need different fields for different views

class AppCommentSerializer(ModelSerializer):
    class Meta:
        model = ApplicationComment
        fields = ['message']

class ShelterCommentSerializer(ModelSerializer):
    class Meta:
        model = ShelterComment
        fields = '__all__'

class ShelterCommentCreateSerializer(ModelSerializer):
    class Meta:
        model = ShelterComment
        fields = ['rating', 'message']