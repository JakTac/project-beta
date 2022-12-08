from django.db import models

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=100, unique=True, null=True)
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    name = models.CharField(max_length=50)
    employee_number = models.IntegerField(unique=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    customer = models.CharField(max_length=50)
    date = models.DateField(auto_now_add=False, null=True)
    time = models.TimeField(auto_now_add=False, null=True)
    reason = models.CharField(max_length=250)
    completed = models.BooleanField(default=False)
    vip = models.BooleanField(default=False)
    vin = models.CharField(max_length=17, null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"{self.owner} - {self.date} - {self.time}"