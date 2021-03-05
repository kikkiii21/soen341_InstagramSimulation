from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile,Connection

# User Serializer
class UserSerializer(serializers.ModelSerializer):
	posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
	comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

	class Meta:
		model = User
		fields = ('id', 'username', 'first_name', 'last_name', 'email', 'posts', 'comments')


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
	class Meta: 
		model = User
		fields = ('id', 'username', 'email', 'password')
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

		return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
	username = serializers.CharField()
	password = serializers.CharField()

	def validate(self, data):
		user = authenticate(**data)
		if user and user.is_active:
			return user
		raise serializers.ValidationError("Incorrect Credentials")


# followers
class UserListSerializer(serializers.ModelSerializer):
	following = serializers.SerializerMethodField()
	follows_requesting_user = serializers.SerializerMethodField()

	class Meta:
		model = UserProfile
		fields = ('following', 'follows_requesting_user', 'follow_link',)


def get_following(self, obj):
	creator = self.context['request'].user
	following = obj.user
	connected = Connection.objects.filter(creator=creator, following=following)
	return len(connected)


def get_follows_requesting_user(self, obj):
	creator = self.context['request'].user
	following = obj.user
	connected = Connection.objects.filter(creator=following, following=creator)
	return len(connected)



# class UpdateProfileSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = UserProfile
# 		fields = ('email')

# class UserProfileSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = UserProfile
# 		fields = ('name', 'email')