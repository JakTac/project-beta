# Generated by Django 4.0.3 on 2022-12-07 00:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_alter_salesperson_employee_nummber'),
    ]

    operations = [
        migrations.RenameField(
            model_name='salesperson',
            old_name='employee_nummber',
            new_name='employee_number',
        ),
    ]
