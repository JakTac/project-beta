# Generated by Django 4.0.3 on 2022-12-07 00:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0004_remove_appointment_date_and_time_appointment_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]
