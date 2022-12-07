# Generated by Django 4.0.3 on 2022-12-07 00:54

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_automobilevo_import_href'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='date_and_time',
        ),
        migrations.AddField(
            model_name='appointment',
            name='date',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appointment',
            name='time',
            field=models.TimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]