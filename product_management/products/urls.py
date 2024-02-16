from django.urls import path
from . import views
from .views import product_list

urlpatterns = [
    path('add/', views.add_product, name='add_product'),
    path('list/', product_list, name='product_list')
]
