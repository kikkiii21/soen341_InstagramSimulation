from django.urls import path, re_path, include
from .views import PostAPI
from rest_framework import routers
from .views import PostDetailAPI

# router = routers.DefaultRouter()
# router.register('posts', PostViewSet, 'posts')

urlpatterns = [
	# router.urls,
	# path('', include(router.urls)),
	path('posts/', PostAPI.as_view()),
	path('posts/<int:pk>/', PostDetailAPI.as_view()),
	# path('posts/', PostAPI.as_view(), name= 'posts_list'),

]
	

# urlpatterns = [
# 	path('feed', PostView.as_view()),
# 	path('create-post', CreatePostView.as_view()),
# 	path('join', JoinView.as_view()),
# 	path('logout', LogoutView.as_view())
# ]
