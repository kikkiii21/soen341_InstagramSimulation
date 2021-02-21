from django.urls import path
from . import views

urlpatterns = [
    path('',views.home, name ='post-home'),
    path('postlist/', views.PostView.as_view())
]