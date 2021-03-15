from django.urls import path
from .views import RegisterAPI, LoginAPI, UserAPI, FollowAPI, UserListAPI, FollowedPostsAPI
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	path('join', RegisterAPI.as_view()),
	path('login', LoginAPI.as_view()),
	path('users/', UserListAPI.as_view()),
	path('user/<int:pk>/', UserAPI.as_view()),
	path('follow/', FollowAPI.as_view()),
	path('followingEndpoint/', FollowedPostsAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)