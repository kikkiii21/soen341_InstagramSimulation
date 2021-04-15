from django.urls import path
from .views import PostAPI, PostDetailAPI, PostCommentsAPI

urlpatterns = [
        path('postsEndpoint/', PostAPI.as_view(), name = 'post_list'),
        path('postsEndpoint/<int:pk>/', PostDetailAPI.as_view()),
        path('postsEndpoint/<post_id>/comments', PostCommentsAPI.as_view()),
]
