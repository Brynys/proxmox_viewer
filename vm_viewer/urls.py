from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_vms, name='get_vms'),
]