from django.urls import path
# from .views import PostView, CreatePostView, JoinView, LogoutView
from rest_framework import routers
from .api import PostViewSet

router = routers.DefaultRouter()
router.register('post', PostViewSet, 'posts')

urlpatterns = router.urls

# urlpatterns = [
# 	path('feed', PostView.as_view()),
# 	path('create-post', CreatePostView.as_view()),
# 	path('join', JoinView.as_view()),
# 	path('logout', LogoutView.as_view())
# ]
