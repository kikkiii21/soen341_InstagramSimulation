from .models import Comment
from rest_framework import generics, authentication
from .serializers import CommentSerializer

# Create your views here.
class CommentListAPI(generics.ListCreateAPIView):
    authentication_classes = (authentication.SessionAuthentication,)
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permissions_classes = ['permissions.IsAuthenticatedOrReadOnly']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
