import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutoMobileVO

def get_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    if content['autos']:
        print('autos received')
    for automobile in content["autos"]:
        AutoMobileVO.objects.update_or_create(
            import_href=automobile["href"],
            vin=automobile['vin'],
            defaults={"vin": automobile["vin"]},
        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(20)


if __name__ == "__main__":
    poll()
