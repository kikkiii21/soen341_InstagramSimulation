from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Profile, Follow


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    follows = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    username = serializers.ReadOnlyField(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'posts', 'comments', 'follows')


# Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('id', 'user')


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True, many=False)

    class Meta:
        model = Profile
        fields = ('id', 'user')

    def update(self, instance, validated_data):
        nested_serializer = self.fields['user']
        nested_instance = instance.user
        nested_data = validated_data.pop('user')
        nested_serializer.update(nested_instance, nested_data)
        return super(UserProfileSerializer, self).update(instance, validated_data)


class UserPhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('id', 'photo')


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "You dont have permission for this user."})

        instance.set_password(validated_data['password'])
        instance.save()

        return instance


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], first_name=validated_data['first_name'],
         last_name=validated_data['last_name'], email=validated_data['email'], password=validated_data['password'])
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
class FollowSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Follow
        fields = ('user', 'following')


def get_following(self, obj):
    creator = self.context['request'].user
    following = obj.user
    connected = Follow.objects.filter(creator=creator, following=following)
    return len(connected)


def get_follows_requesting_user(self, obj):
    creator = self.context['request'].user
    following = obj.user
    connected = Follow.objects.filter(creator=following, following=creator)
    return len(connected)
