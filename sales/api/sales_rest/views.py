from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutoMobileVO, SalesPerson, Customer, Sale

class AutoMobileVODetailEncoder(ModelEncoder):
    model = AutoMobileVO
    properties = [
        "vin",
        "import_href",
    ]

class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
        "id",
    ]

class SalesPersonDetailEncoder(ModelEncoder):
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
        "salesperson": SalesPersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_sales_person(request):
    if request.method == "GET":
        salespeople = SalesPerson.objects.all()
        return JsonResponse(
            {"Sales people": salespeople},
            encoder=SalesPersonListEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = SalesPerson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_show_sales_person(request, pk):
    if request.method == "GET":
        salesperson = SalesPerson.objects.get(employee_number = pk)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonDetailEncoder,
            safe=False
        )
    else:
        count, _ = SalesPerson.objects.filter(employee_number=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"Customers": customers},
            encoder=CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, pk):
    if request.method == "GET":
        customer = Customer.objects.get(id = pk)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET", "POST"])
def api_list_sales(request, pk=None):
    if request.method == "GET":
        if pk is not None:
            print(pk)
            print(Sale.objects.all().values())
            sales = Sale.objects.filter(salesperson=pk)
        else:
            sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleListEncoder,
            )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            automobile_vin = content['automobile']
            automobile = AutoMobileVO.objects.get(vin=automobile_vin)
            content['automobile'] = automobile
        except AutoMobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile vin"},
                satus=400,
            )
        try:
            employee_number = content["salesperson"]
            salesperson = SalesPerson.objects.get(employee_number=employee_number)
            content['salesperson'] = salesperson
        except SalesPerson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee number"},
                status=400
            )
        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=400
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, pk):
    if request.method == "GET":
        sale = Sale.objects.get(id=pk)
        return JsonResponse(
            sale,
            encoder=SaleListEncoder,
            safe=False,
        )
    else:
        count, _ = Sale.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET"])
def api_sales_by_salesperson(request,employee_number):
    salesperson = SalesPerson.objects.get(employee_number=employee_number)
    sales_by_salesperson = Sale.objects.filter(salesperson=salesperson)
    return JsonResponse(
        sales_by_salesperson,
        encoder=SaleListEncoder,
        safe=False
    )