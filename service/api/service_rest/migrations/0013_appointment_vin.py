# Generated by Django 4.0.3 on 2022-12-08 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0012_remove_appointment_automobile'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='vin',
            field=models.CharField(max_length=17, null=True, unique=True),
        ),
    ]
