from common.json import ModelEncoder
from .models import Appointment, AutomobileVO, Technician


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_href",
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "name",
        "employee_number",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "vin",
        "vip",
        "date",
        "time",
        "reason",
        "customer",
        "completed",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }