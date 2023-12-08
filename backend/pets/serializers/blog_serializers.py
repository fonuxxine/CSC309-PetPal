from rest_framework.serializers import ModelSerializer, DateTimeField, PrimaryKeyRelatedField
from ..models import Blog

class BlogSerializer(ModelSerializer):
    publication_date = DateTimeField(read_only=True)
    shelter = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Blog
        fields = '__all__'
