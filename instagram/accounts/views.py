from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import RegisterSerializer, LoginSerializer, UserListSerializer, UserSerializer
from django.contrib.auth.models import User


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
            "token": AuthToken.objects.create(user)[1]
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
    # permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

# def get_object(self):
# 	return self.request.user


# Get User List API
class UserListAPI(generics.ListAPIView):
    queryset = User.objects.all()
    # permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserListSerializer
