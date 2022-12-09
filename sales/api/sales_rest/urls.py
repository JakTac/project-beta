from django.urls import path
from .views import (api_list_sales_person, api_show_sales_person, api_list_customers,
api_show_customer, api_list_sales, api_show_sale, api_sales_by_salesperson, api_list_automobilesvo)


urlpatterns = [
    path("salesperson/", api_list_sales_person, name="api_create_sales_person"),
    path("salesperson/<int:pk>/", api_show_sales_person, name="api_show_sales_person"),
    path("customer/", api_list_customers, name="api_create_customer"),
    path("customer/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("autos/", api_list_automobilesvo, name="list_automobiles_vo"),
    path("sales/", api_list_sales, name="api_create_sales"),
    path("salesperson/<int:employee_number>/sales/", api_sales_by_salesperson, name="api_sales_by_salesperson"),
    path("sales/<int:pk>/", api_show_sale, name="api_show_sale"),
]
