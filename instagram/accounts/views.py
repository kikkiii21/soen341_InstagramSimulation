from rest_framework import generics, permissions, authentication
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from knox.models import AuthToken
from .serializers import RegisterSerializer, LoginSerializer, FollowSerializer, UserSerializer, \
    ChangePasswordSerializer, UserProfileSerializer, ProfileSerializer, UserPhotoSerializer
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import password_validators_help_texts
from .models import Profile, Follow
from posts.serializers import PostSerializer
from posts.models import Post


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            # saves user and its data
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            # creates token for that particular user
            "token": AuthToken.objects.create(user)[1],
            "passwordValidators": password_validators_help_texts(password_validators=None)
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            # saves user and its data
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            # creates token for that particular user
            "token": AuthToken.objects.create(user)[1]
        })


# Get User API
class UserAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileUpdateView(generics.UpdateAPIView):
    authentication_classes = (authentication.SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserProfileSerializer

    def get_object(self):
        return Profile.objects.get(user=self.request.user)


class ProfilePictureListAPI(generics.ListAPIView):
    serializer_class = UserPhotoSerializer
    queryset = Profile.objects.all()


class PhotoUpdateView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserPhotoSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        return Profile.objects.get(user=self.request.user)


class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChangePasswordSerializer


class FollowAPI(generics.ListCreateAPIView):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Get User List API
class UserListAPI(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer


# Get Profile List API
class ProfileListAPI(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class FollowedPostsAPI(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        followed_people = Follow.objects.filter(user=self.request.user).values('following')
        return Post.objects.filter(author__in=followed_people)

