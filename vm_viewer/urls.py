from django.urls import path
from . import views

urlpatterns = [
    path('bubles/', views.bubles, name='bubles'),
    path('get_vms/', views.get_vms, name='get_vms'),
    path('toggle_vm/<int:vmid>/<str:action>/<str:node>/', views.toggle_vm_view, name='toggle_vm'),
    path('table/', views.table, name='table'),
]