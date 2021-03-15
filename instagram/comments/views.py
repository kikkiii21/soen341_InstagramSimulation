from django.shortcuts import render
from .models import Comment
from posts.models import Post
from rest_framework.views import APIView
from rest_framework import generics, permissions
from .serializers import CommentSerializer
from posts.permissions import IsOwnerOrReadOnly

# Create your views here.
class CommentListAPI(generics.ListCreateAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer
	permissions_classes = ['permissions.IsAuthenticatedOrReadOnly']

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)