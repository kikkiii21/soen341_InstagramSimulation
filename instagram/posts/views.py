from django.shortcuts import render
from rest_framework import generics, status, viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post
from rest_framework.decorators import api_view
from rest_framework import viewsets, permissions
from .permissions import IsOwnerOrReadOnly


# from .serializers import PostSerializer
# from .models import Post
# from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.response import Response
# from rest_framework import status
# Create your views here.

class PostView(APIView):

	
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = PostSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# PostViewAPI
# class PostAPI(generics.ListCreateAPIView):
# 	queryset = Post.objects.all()
# 	serializer_class = PostSerializer
# 	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# 	def perform_create(self, serializer):
# 		serializer.save(owner=self.request.user)

class PostDetailAPI(generics.RetrieveUpdateDestroyAPIView):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# UserProfile Viewset
class PostViewSet(viewsets.ModelViewSet):
	queryset = Post.objects.all()

	permission_classes = [permissions.AllowAny]
	
	serializer_class = PostSerializer
	
	# def get_queryset(self):
	# 	return self.user.request.posts.all()

	def perform_create(self, serializer):
		serializer.save(owner=self.request.user)
	


# Create your views here.
# @api_view(['GET', 'POST'])
# def posts_list(request):
# 	if request.method == 'GET':
# 		data = Post.objects.all()

# 		serializer = PostSerializer(data, context={'request': request}, many=True)

# 		return Response(serializer.data)

# 	elif request.method == 'POST':
# 		serializer = PostSerializer(data=request.data)
# 		if serializer.is_valid():
# 			serializer.save()
# 			return Response(status=status.HTTP_201_CREATED)

# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT', 'DELETE'])
# def post_details(request, pk):
# 	try:
# 		post = Post.objects.get(pk=pk)
# 	except Post.DoesNotExist:
# 		return Response(status=status.HTTP_404_NOT_FOUND)

# 	if request.method == 'PUT':
# 		serializer = PostSerializer(post, data=request.data,context={'request': request})
# 		if serializer.is_valid():
# 			serializer.save()
# 			return Response(status=status.HTTP_204_NO_CONTENT)
# 		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 	elif request.method == 'DELETE':
# 		post.delete()
# 		return Response(status=status.HTTP_204_NO_CONTENT)


# class PostList(generics.ListCreateAPIView):
# 	queryset = Post.objects.all()
# 	serializer_class = serializer_class.PostSerializer

# 	def perform_create(self, serializer):
# 		serializer.save(uploaded_by=self.request.user)

# class PostDetail(generics.RetrieveUpdateDestroyAPIView):
# 	queryset = Post.objects.all()
# 	serializer_class = serializers.PostSerializer
	
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


# class UpdateProfileView(APIView):
# 	serializer_class = UpdateProfileSerializer

# 	def patch(self, request, format=None):
# 		serializer = self.serializer_class(data=request.data)
# 		if serializer.is_valid():
# 			email = serializer.data.get('email')

# 			queryset = UserProfile.objects.filter(username=username)

# 		return Response({'Bad Request':"Invalid Data..."}, status=status.HTTP_200_OK)

