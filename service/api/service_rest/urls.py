from django.urls import path
from .views import (api_list_appointments, api_show_appointment, api_list_technicians)


urlpatterns = [
    path('appointments/', api_list_appointments, name='api_list_appointments'),
    path('<vin>/appointments/', api_show_appointment, name="api_appointments_by_vin"),
    path('technicians/', api_list_technicians, name='api_list_technicians')
]
