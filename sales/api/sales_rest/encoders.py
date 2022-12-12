from common.json import ModelEncoder
from .models import AutoMobileVO, SalesPerson, Sale, Customer


class AutoMobileVODetailEncoder(ModelEncoder):
    model = AutoMobileVO
    properties = [
        "vin",
        "import_href",
        "sold",
    ]

class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
        "id",
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "phone_number",
        "id",
    ]

class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
    ]

class SaleListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
        "id",
    ]

    encoders = {
        "automobile": AutoMobileVODetailEncoder(),
        "salesperson": SalesPersonListEncoder(),
        "customer": CustomerDetailEncoder(),
    }