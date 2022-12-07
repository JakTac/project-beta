from django.db import models
from django.urls import reverse

class AutoMobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True, null=True)


class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.IntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"pk": self.id})


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=12, unique=True)

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutoMobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        SalesPerson,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    price = models.PositiveIntegerField()

    def get_api_url(self):
        return reverse("api_sale", kwargs={"pk": self.id})