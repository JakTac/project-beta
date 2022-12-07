# Generated by Django 4.0.3 on 2022-12-07 01:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0006_rename_service_appointment_reason'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='vin',
        ),
        migrations.AddField(
            model_name='appointment',
            name='automobile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='service_rest.automobilevo'),
        ),
    ]
