from django.views.decorators.http import require_http_methods
from .encoders import AppointmentEncoder, TechnicianEncoder
from .models import Technician, Appointment
from django.http import JsonResponse
from django.shortcuts import render
import json


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {'technicians': technicians},
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            employee_number = content['employee_number']
            print(f"This is the the employee number: {employee_number}")
            employee = Technician.objects.get(employee_number=employee_number)
            if employee:
                return JsonResponse(
                    {"message": "That employee already exists. Please enter a unique number"}
                )
        except Technician.DoesNotExist:
                print("Did not find an employee with this number")
                technician = Technician.objects.create(**content)
                return JsonResponse(
                    technician,
                    encoder=TechnicianEncoder,
                    safe=False,
                )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request, automobile_vo_id=None):
    if request.method == "GET":
        if automobile_vo_id is not None:
            appointments = Appointment.objects.get(automobile=automobile_vo_id)
        else:
            appointments = Appointment.objects.all()
        return JsonResponse(
            {'appointments': appointments},
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            technician_employee_number = content['technician']
            technician = Technician.objects.get(employee_number=technician_employee_number)
            content['technician'] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician"}
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_appointment(request, vin):
    if request.method == "GET":
        appointment = Appointment.objects.filter(vin=vin)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.filter(vin=vin).delete()
        appointments = Appointment.objects.all()
        if count > 0:
            return JsonResponse(
                appointments,
                encoder=AppointmentEncoder,
                safe=False
            )
    else:
        content = json.loads(request.body)
        technician_id = content['technician']['id']
        content['technician'] = technician_id
        Appointment.objects.filter(vin=vin).update(**content)
        appointment = Appointment.objects.get(vin=vin)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
