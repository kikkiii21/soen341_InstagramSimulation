from rest_framework import generics, status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PostSerializer
from comments.serializers import CommentSerializer
from .models import Post
from comments.models import Comment
from .permissions import IsOwnerOrReadOnly

# PostViewAPI
class PostAPI(generics.ListCreateAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	def perform_create(self, serializer):
		serializer.save(author=self.request.user)

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
