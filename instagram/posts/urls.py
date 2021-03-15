from django.urls import path
from .views import PostAPI, PostDetailAPI, PostCommentsAPI


urlpatterns = [
	path('posts/', PostAPI.as_view()),
	path('posts/<int:pk>/', PostDetailAPI.as_view()),
	path('posts/<post_id>/comments', PostCommentsAPI.as_view()),
]
