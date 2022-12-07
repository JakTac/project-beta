from django.urls import path
from .views import (api_list_sales_person, api_show_sales_person, api_list_customers,
api_show_customer, api_list_sales, api_show_sale, api_sales_by_salesperson)


urlpatterns = [
    path("sales_person/", api_list_sales_person, name="api_create_sales_person"),
    path("sales_person/<int:pk>/", api_show_sales_person, name="api_show_sales_person"),
    path("customer/", api_list_customers, name="api_create_customer"),
    path("customer/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("sales/", api_list_sales, name="api_create_sales"),
    path("sales_person/<int:employee_number>/sales/", api_sales_by_salesperson, name="api_sales_by_salesperson"),
    path("sales/<int:pk>/", api_show_sale, name="api_show_sale"),
]