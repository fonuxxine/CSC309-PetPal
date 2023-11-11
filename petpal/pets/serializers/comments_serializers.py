from rest_framework.serializers import ModelSerializer, DateTimeField, PrimaryKeyRelatedField
from ..models import ShelterComment, ApplicationComment, ShelterCommentResponse

# might need more than one serializer if you need different fields for different views

class AppCommentSerializer(ModelSerializer):
    user_from = PrimaryKeyRelatedField(read_only=True)
    user_to = PrimaryKeyRelatedField(read_only=True)
    application = PrimaryKeyRelatedField(read_only=True)
    time_created = DateTimeField(read_only=True)
    class Meta:
        model = ApplicationComment
        fields = '__all__'

class ShelterCommentCreateSerializer(ModelSerializer):
    shelter = PrimaryKeyRelatedField(read_only=True)
    user_from = PrimaryKeyRelatedField(read_only=True)
    time_created = DateTimeField(read_only=True)
    class Meta:
        model = ShelterComment
        fields = '__all__'

class ShelterCommentResponseSerializer(ModelSerializer):
    review = PrimaryKeyRelatedField(read_only=True)
    user_from = PrimaryKeyRelatedField(read_only=True)
    time_created = DateTimeField(read_only=True)
    class Meta:
        model = ShelterCommentResponse
        fields = '__all__'

class ShelterCommentSerializer(ModelSerializer):
    replies = ShelterCommentResponseSerializer(source='sheltercommentresponse_set', many=True)
    
    class Meta:
        model = ShelterComment
        fields = ['id', 'shelter', 'user_from', 'message', 'rating', 'replies', 'time_created']