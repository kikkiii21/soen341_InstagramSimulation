from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
	uploaded_by = serializers.ReadOnlyField(source = 'uploaded_by.username')

	class Meta:
		model = Post
		fields = ('id', 'title', 'photo', 'uploaded_by', 'created_at', 'likes')


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfile
#         fields = ('id', 'name', 'email', 'created_at')

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