from django.urls import path, re_path, include
from .views import CommentListAPI, CommentDetailAPI
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	path('comments/', CommentListAPI.as_view()),
	path('comments/<int:pk>', CommentDetailAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
