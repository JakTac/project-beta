from django.urls import path
from .views import (api_list_appointments, api_show_appointment, api_appointment_history,
                    api_list_technicians, api_appointments_by_vin)

urlpatterns = [
    path('appointments/', api_list_appointments, name='api_list_appointments'),
    path('appointments/<int:pk>/', api_show_appointment, name='api_show_appointment'),
    path('<vin>/appointments/', api_appointments_by_vin, name="api_appointments_by_vin"),
    path('appointments/<vin>/', api_appointment_history, name='api_appointment_history'),
    path('technicians/', api_list_technicians, name='api_list_technicians')
]
