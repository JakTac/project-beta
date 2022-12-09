import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
from service_rest.models import AutomobileVO

def get_autos():
    print('getting autos')
    response = requests.get('http://inventory-api:8000/api/automobiles/')
    content = json.loads(response.content)
    if content['autos']:
        print('autos received')
    for auto in content['autos']:
        AutomobileVO.objects.update_or_create(
            import_href=auto["href"],
            vin=auto['vin'],
            defaults={"vin": auto["vin"]},
        )

def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_autos()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(10)


if __name__ == "__main__":
    poll()
