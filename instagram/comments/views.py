from .models import Comment

from rest_framework import generics, permissions
from .serializers import CommentSerializer


# Create your views here.
class CommentListAPI(generics.ListCreateAPIView):
	queryset = Comment.objects.all()
	serializer_class = CommentSerializer
	permissions_classes = ['permissions.IsAuthenticatedOrReadOnly']

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)