from .models import Comment
from rest_framework import serializers


# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
	user_id = serializers.ReadOnlyField(source='owner.username')

	class Meta:
		model = Comment
		fields = ['id', 'body', 'owner', 'post']