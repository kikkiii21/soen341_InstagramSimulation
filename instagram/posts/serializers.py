from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

	class Meta: 
		model = Post
		fields = ('id', 'title', 'photo', 'created_at', 'owner', 'comments')

