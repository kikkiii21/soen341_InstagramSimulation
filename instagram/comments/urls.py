from django.urls import path
from .views import CommentListAPI
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
        path('commentsEndpoint/', CommentListAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
