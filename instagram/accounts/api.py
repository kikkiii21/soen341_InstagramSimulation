from django.contrib.auth import login
from django.shortcuts import render,redirect
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

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
	def webpage(request):
		if request.method == "POST":
			return redirect('instagram/frontend/templates/frontend/index/html')

#Login View Judy
# class LoginAPI(KnoxLoginView):
# 	permission_classes = (permissions.AllowAny,)
#
# 	def post(self,request,format =None):
# 		serializer = AuthTokenSerializer(data=request.data)
# 		serializer.is_valid(raise_exception=True)
# 		user = serializer.validated_data['user']
# 		login(request,user)
# 		return super(LoginAPI, self).post(request,format=None)


# Get User API
class UserAPI(generics.RetrieveAPIView):
	permission_classes = (permissions.IsAuthenticated,)
	serializer_class = UserSerializer

	def get_object(self):
		return self.request.user