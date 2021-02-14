from django.urls import path, re_path, include
# from .views import PostView, CreatePostView, JoinView, LogoutView
from rest_framework import routers
from .api import PostViewSet
from . import views

router = routers.DefaultRouter()
router.register('post', PostViewSet, 'posts')

urlpatterns = [
	# router.urls,
	re_path(r'^post/$', views.posts_list),
	re_path(r'^post/detail/([0-9])$', views.post_details),
]
	

# urlpatterns = [
# 	path('feed', PostView.as_view()),
# 	path('create-post', CreatePostView.as_view()),
# 	path('join', JoinView.as_view()),
# 	path('logout', LogoutView.as_view())
# ]
