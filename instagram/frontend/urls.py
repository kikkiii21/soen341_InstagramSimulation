from django.urls import path
from .views import index


urlpatterns = [
    path('', index),
    path('signup', index),
    path('signin', index),
    path('homepage', index),
    path('followhomepage/', index),

]
