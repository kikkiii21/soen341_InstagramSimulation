from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post

# Create your views here.
class PostList(generics.ListCreateAPIView):
	queryset = Post.objects.all()
	serializer_class = serializer_class.PostSerializer

	def perform_create(self, serializer):
		serializer.save(uploaded_by=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Post.objects.all()
	serializer_class = serializers.PostSerializer
	
# class UserView(generics.CreateAPIView):
#     queryset = UserProfile.objects.all()
#     serializer_class = UserSerializer

# class PostView(generics.ListAPIView):
# 	queryset = Post.objects.all()
# 	serializer_class = PostSerializer


# class CreatePostView(APIView):
# 	serializer_class = CreatePostSerializer

# 	def post(self, request, format=None):
# 		if not self.request.session.exists(self.request.session.session_key):
# 			self.request.session.create()

# 		serializer = self.serializer_class(data=request.data)
# 		if serializer.is_valid():
# 			title = serializer.data.get('title')
# 			photo = serializer.data.get('photo')
# 			# uploaded_by = serializer.data.uploaded_by
# 			post = Post(title=title, photo=photo)
# 			post.save()
# 		return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)



# class JoinView(APIView):
# 	def post(self, request, format=None):



# class LoginView(APIView):
# 	def post(self, request, format=None):
# 		return Response({'Message': 'Successfully logged in!'}, status=status.HTTP_200_OK)



# class LogoutView(APIView):
# 	def post(self, request, format=None):
# 		return Response({'Message': 'Successfully logged out!'}, status=status.HTTP_200_OK)



# class UpdateProfileView(APIView):
# 	serializer_class = UpdateProfileSerializer

# 	def patch(self, request, format=None):
# 		serializer = self.serializer_class(data=request.data)
# 		if serializer.is_valid():
# 			email = serializer.data.get('email')

# 			queryset = UserProfile.objects.filter(username=username)

# 		return Response({'Bad Request':"Invalid Data..."}, status=status.HTTP_200_OK)
	