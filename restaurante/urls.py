from django.urls import path
from . import views

app_name = 'restaurante'

urlpatterns = [
    path('', views.menu, name='menu'),
]

