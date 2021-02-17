from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
	path('auth', include('knox.urls')),
	path('auth/join', RegisterAPI.as_view()),
	path('auth/login', LoginAPI.as_view()),
	path('auth/user', UserAPI.as_view()),
	path('auth/logout', knox_views.LoginView.as_view(), name = 'knox_logout')
]