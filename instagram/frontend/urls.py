from django.urls import path
from .views import index


urlpatterns = [
    path('', index),
    path('register', index),
    path('login', index),
    path('homepage', index),
    path('following', index),
    path('profile', index),

]
