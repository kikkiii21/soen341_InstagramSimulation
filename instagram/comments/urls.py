from django.urls import path, re_path, include
from .views import CommentListAPI
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
	path('comments/', CommentListAPI.as_view()),
	# path('comments/<post_id>', CommentDetailAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
