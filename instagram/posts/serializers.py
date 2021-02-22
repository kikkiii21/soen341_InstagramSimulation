from rest_framework import serializers
from .models import Post

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfile
#         fields = ('id', 'name', 'email', 'created_at')

class PostSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.username')
	comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

	class Meta: 
		model = Post
		fields = ('id', 'title', 'photo', 'created_at', 'owner', 'comments')


# class CreatePostSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = Post
# 		fields = ('title', 'photo')


# class UpdateProfileSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = UserProfile
# 		fields = ('email')

# class UserProfileSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = UserProfile
# 		fields = ('name', 'email')