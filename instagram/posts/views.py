from rest_framework import generics, status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PostSerializer
from comments.serializers import CommentSerializer
from .models import Post
from comments.models import Comment
from .permissions import IsOwnerOrReadOnly
# from django.shortcuts import render
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework import status

# Create your views here.


# PostViewAPI
class PostAPI(generics.ListCreateAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)


class PostDetailAPI(generics.RetrieveUpdateDestroyAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class PostCommentsAPI(generics.ListAPIView):
	serializer_class = CommentSerializer
	lookup_url_kwarg = "post_id"

	def get_queryset(self):
		post_id = self.kwargs.get(self.lookup_url_kwarg)
		post_comments = Comment.objects.filter(post_id=post_id)
		return post_comments


# class UpdateProfileView(APIView):
# 	serializer_class = UpdateProfileSerializer

# 	def patch(self, request, format=None):
# 		serializer = self.serializer_class(data=request.data)
# 		if serializer.is_valid():
# 			email = serializer.data.get('email')

# 			queryset = UserProfile.objects.filter(username=username)

# 		return Response({'Bad Request':"Invalid Data..."}, status=status.HTTP_200_OK)

