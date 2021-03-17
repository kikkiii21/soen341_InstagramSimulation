from django.urls import path, include
from .views import RegisterAPI, LoginAPI, UserAPI, FollowAPI, UserListAPI, FollowedPostsAPI, ProfileListAPI
from rest_framework.urlpatterns import format_suffix_patterns
from knox import views as knox_views

urlpatterns = [
	path('join', RegisterAPI.as_view(), name='register-user'),
	path('login', LoginAPI.as_view(), name='login-user'),
	path('users/', UserListAPI.as_view(), name='list-all-users'),
	path('user/<int:pk>/', UserAPI.as_view()),
	path('profiles/', ProfileListAPI.as_view(), name='list-all-profiles'),
	path('follow/', FollowAPI.as_view()),
	path('followingEndpoint/', FollowedPostsAPI.as_view()),
	path('logout', knox_views.LogoutView.as_view(), name = 'logout-user'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
