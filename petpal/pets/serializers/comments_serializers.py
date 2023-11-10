from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from ..models import ShelterComment, ApplicationComment, ShelterCommentResponse

# might need more than one serializer if you need different fields for different views

class AppCommentSerializer(ModelSerializer):
    class Meta:
        model = ApplicationComment
        fields = '__all__'
        
class AppCommentCreateSerializer(ModelSerializer):
    class Meta:
        model = ApplicationComment
        fields = ['message']

class ShelterCommentCreateSerializer(ModelSerializer):
    class Meta:
        model = ShelterComment
        fields = ['rating', 'message']

class ShelterCommentResponseCreateSerializer(ModelSerializer):
    class Meta:
        model = ShelterCommentResponse
        fields = ['message']

class ShelterCommentResponseSerializer(ModelSerializer):
    class Meta:
        model = ShelterCommentResponse
        fields = '__all__'

class ShelterCommentSerializer(ModelSerializer):
    replies = ShelterCommentResponseSerializer(source='sheltercommentresponse_set', many=True)
    
    class Meta:
        model = ShelterComment
        fields = ['shelter', 'user_from', 'message', 'rating', 'replies', 'time_created']