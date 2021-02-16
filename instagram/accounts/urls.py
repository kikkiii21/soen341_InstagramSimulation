from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
	path('auth', include('knox.urls')),
	path('auth/join', RegisterAPI.as_view(),name = 'register'),
	path('auth/login', LoginAPI.as_view(),name ='login'),
	path('auth/user', UserAPI.as_view(),name ='userprofile'),
	path('auth/logout', knox_views.LogoutView.as_view(), name = 'knox_logout'),
	path('auth/logoutall',knox_views.LogoutAllView.as_view(),name = 'logoutall'),
]