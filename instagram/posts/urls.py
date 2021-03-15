from django.urls import path, re_path, include
from .views import PostAPI, PostDetailAPI, PostCommentsAPI
from rest_framework import routers

# router = routers.DefaultRouter()
# router.register('posts', PostViewSet, 'posts')

urlpatterns = [
	# router.urls,
	# path('', include(router.urls)),
	path('posts/', PostAPI.as_view()),
	path('posts/<int:pk>/', PostDetailAPI.as_view()),
	path('posts/<post_id>/comments', PostCommentsAPI.as_view()),
	# path('posts/', PostAPI.as_view(), name= 'posts_list'),
]
