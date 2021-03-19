from .models import Comment
from rest_framework import serializers


# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
	author = serializers.ReadOnlyField(source='author.username')

	class Meta:
		model = Comment
		fields = ['id', 'comment', 'author', 'post']