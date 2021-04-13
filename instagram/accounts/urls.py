from django.urls import path, include
from .views import RegisterAPI, LoginAPI, UserAPI, FollowAPI, UserListAPI, FollowedPostsAPI, ProfileListAPI, \
	ChangePasswordView, ProfileUpdateView,PhotoUpdateView,ProfilePictureListAPI
from rest_framework.urlpatterns import format_suffix_patterns
from knox import views as knox_views

urlpatterns = [
	path('registerEndpoint/', RegisterAPI.as_view(), name='register-user'),
	path('loginEndpoint/', LoginAPI.as_view(), name='login-user'),
	path('userlistEndpoint/', UserListAPI.as_view(), name='list-all-users'),
	path('userEndpoint/<int:pk>/', UserAPI.as_view()),
	path('profilelistEndpoint/', ProfileListAPI.as_view(), name='list-all-profiles'),
	path('profilePictureList/', ProfilePictureListAPI.as_view(), name='list-all-profiles-pictures'),
	path('followEndpoint/', FollowAPI.as_view()),
	path('followingEndpoint/', FollowedPostsAPI.as_view()),
	path('logoutEndpoint', knox_views.LogoutView.as_view(), name='logout-user'),
	path('changePassword/<int:pk>/', ChangePasswordView.as_view(), name='auth-change-password'),
	path('updateProfile/', ProfileUpdateView.as_view(), name='auth-update-profile'),
	path('updatePhoto/', PhotoUpdateView.as_view(), name='auth-update-photo'),
]

urlpatterns = format_suffix_patterns(urlpatterns)

