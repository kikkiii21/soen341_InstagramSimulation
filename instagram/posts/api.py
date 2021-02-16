
from rest_framework import viewsets, permissions
from .serializers import PostSerializer
from django.shortcuts import render
from rest_framework import generics, status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post
from rest_framework.decorators import api_view


# UserProfile Viewset
class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.posts.all()

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


# Create your views here.
@api_view(['GET', 'POST'])
def posts_list(request):
	if request.method == 'GET':
		data = Post.objects.all()

		serializer = PostSerializer(data, context={'request': request}, many=True)

		return Response(serializer.data)

	elif request.method == 'POST':
		serializer = PostSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def post_details(request, pk):
	try:
		post = Post.objects.get(pk=pk)
	except Post.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'PUT':
		serializer = PostSerializer(post, data=request.data,context={'request': request})
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_204_NO_CONTENT)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	elif request.method == 'DELETE':
		post.delete()
		return Response(status=status.HTTP_204_NO_CONTENT)