from django.urls import path
from . import views

urlpatterns = [
    path('', views.react),
    path('signup', views.react),
    path('login', views.react),
    path('HomePage', views.react),
    path('home',views.home,name='home'),
]
