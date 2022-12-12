# <center>**Car Car**

<center>

# **Team**
---
**Kramer Smith** -- Service API
**Jake Tippit** -- Sales API
---

</center>


<br><br>


# <center>**Diagram of Architecture**

---

<br>

<p allign="center">
    <img src="https://i.imgur.com/AaF32TL.png"/>
</p>
<br><br><br>

# <center>**Service Microservice**
---

<br><br>

## **Models**

---
### **Appointment Model** -- (used to create an appointment)

>When creating an appointment the following properties are required: "customer", "date", "time", "reason", "vin" and "technician" which is a foreign key of the Technician Model. 


| **MODEL FIELD** | **FIELD TYPE** | **OTHER ARGS**                             |
| :-------------: | :------------: | :----------------------------------------- |
|    "customer"   |  `CharField`   | `max_length: 50 (required)`                |
|      "date"     |  `DateField`   | `null=True`<br> `auto_now_add=False`       |
|      "time"     |  `TimeField`   | `null=True`<br> `auto_now_add=False`       |
|     "reason"    |  `CharField`   | `max_length: 250 (required)`               |
|   "completed"   |  `BooleanField`| `default=False`                            |
|      "vip"      |  `BooleanField`| `default=False`                            |
|      "vin"      |  `CharField`   | `max_length: 17`<br> `null=True (required)`|
|  "technician"   |  `ForeignKey`  | `Technician`<br>`on_delete=models.CASCADE` |

<br><br>

### **Technician Model** -- (Used to create a technician)

>When creating a technician the following properties are required: "name" and "employee_number"

| **MODEL FIELD** | **FIELD TYPE** | **OTHER ARGS**               |
| :-------------: | :------------: | :--------------------------- |
|     "name"      |  `CharField`   | `max_length: 100 (required)` |
|"employee_number"| `IntegerField` | `unique=True (required)`     |

<br><br>

### **AutomobileVO Model** -- (Used to create a separate instance of automobiles)

>This model is a value object that is used for polling the inventory api. We have it set so every 20 seconds the inventory api sends their automobile data to the service microservice. The service microservice then takes that data and either creates or updates the automobile as a separate instance in the form of AutomobileVO. 

| **MODEL FIELD** |       **FIELD TYPE**        | **OTHER ARGS**               |
| :-------------: | :-------------------------: | :--------------------------- |
|      "vin"      |         `CharField`         | `max_length: 17 (required)`  |
|  "import_href"  |         `CharField`         | `max_length: 200 (required)` |


<br><br>


## **API Views**

---
<br>

### **Appointments :**


| **REQUEST METHOD** |                     **FUNCTION**                      |                     **ENDPOINT**                     |
| :----------------: | :---------------------------------------------------: | :--------------------------------------------------: |
|       `GET`        |                   list appointments                   |       http://localhost:8080/api/appointments/        |
|       `GET`        |      list appointments for that vin                   |       http://localhost:8080/api/appointments/:pk/    |
|       `POST`       |                  create appointment                   |       http://localhost:8080/api/appointments/        |
|      `DELETE`      |                  delete appointment                   |       http://localhost:8080/api/appointments/:pk/    |
|       `PUT`        | update appointment's <br>"completed" property to True |       http://localhost:8080/api/appointments/:pk/    |

<br>

### **Technicians :**

| **REQUEST METHOD** |   **FUNCTION**    |              **ENDPOINT**              |
| :----------------: | :---------------: | :------------------------------------: |
|       `GET`        | list technicians  | http://localhost:8080/api/technicians/ |
|       `POST`       | create technician | http://localhost:8080/api/technicians/ |

<br>

# <center>**Sales Microservice**
---

## **Models**

---

### **AutomobileVO Model** -- (Used to create a separate instance of automobiles)

>This model is a value object that is used for polling the inventory api. We have it set so every 20 seconds the inventory api sends their automobile data to the service microservice. The service microservice then takes that data and either creates or updates the automobile as a separate instance in the form of AutomobileVO. 

| **MODEL FIELD** |       **FIELD TYPE**        | **OTHER ARGS**               |
| :-------------: | :-------------------------: | :--------------------------- |
|      "vin"      |         `CharField`         | `max_length: 17 (required)`  |
|  "import_href"  |         `CharField`         | `max_length: 200 (required)` |
|     "sold"      |         `BooleanField`      | `default=False`              |

<br><br>

### **SalesPerson Model** -- (Used to create a Sales Person)

>When creating a Sales Person, the following parameters are required: "name" and "employee_number"

| **MODEL FIELD** |       **FIELD TYPE**        | **OTHER ARGS**               |
| :-------------: | :-------------------------: | :--------------------------- |
|     "name"      |         `CharField`         | `max_length: 100 (required)` |
|"employee_number"|         `IntegerField`      | `Unique=True (required)`     |

<br><br>

### **Customer Model** -- (Used to create a customer)

>When creating a customer the following properties are required: "name", "address", "phone_number"

| **MODEL FIELD** |       **FIELD TYPE**        | **OTHER ARGS**                              |
| :-------------: | :-------------------------: | :-----------------------------------------: |
|     "name"      |         `CharField`         | `max_length: 100 (required)`                |
|    "address"    |         `CharField`         | `max_length: 100 (required)`                |
| "phone_number"  |         `CharField`         | `max_length:12`<br>`Unique=True (required)` |

<br><br>

### **Sale Model** -- (Used to create a sale)

>When creating a sale the following properties are required: "automobile", "salesperson", "customer", and "price"

| **MODEL FIELD** |       **FIELD TYPE**        | **OTHER ARGS**                              |
| :-------------: | :-------------------------: | :-----------------------------------------: |
|   "automobile"  |         `ForeignKey`        | `AutomobileVO`<br>`on_delete=models.CASCADE`|
|  "salesperson"  |         `ForeignKey`        | `SalesPerson`<br>`on_delete=models.CASCADE` |
|   "customer"    |         `ForeignKey`        | `Customer`<br>`on_delete=models.CASCADE`    |
|    "price"      |   `PositiveIntegerField`    | `none`                                      |

<br><br>

## **API Views**

---
<br>

### **AutomobilesVO :**

| **REQUEST METHOD** |    **FUNCTION**     | **ENDPOINT**                         |
| -----------------: | :-----------------: | :----------------------------------- |
|              `GET` | list Automobile VOs | http://localhost:8090/api/autos/     |

<br>

### **Salesperson :**

| **REQUEST METHOD**  |    **FUNCTION**     | **ENDPOINT**                               |
| ------------------: | :-----------------: | :----------------------------------------: |
|             `GET`   | list Sales Peeople  | http://localhost:8090/api/salesperson/     |
|             `POST`  | create Sales Person | http://localhost:8090/api/salesperson/     |
|             `GET`   | show Sales Person   | http://localhost:8090/api/salesperson/:pk/ |
|             `DELETE`| delete Sales Person | http://localhost:8090/api/salesperson/:pk/ |

<br>

### **Customer :**

| **REQUEST METHOD**  |    **FUNCTION**     | **ENDPOINT**                               |
| ------------------: | :-----------------: | :----------------------------------------: |
|             `GET`   | list Customers  | http://localhost:8090/api/customer/            |
|             `POST`  | create Customer | http://localhost:8090/api/customer/            |
|             `GET`   | show Customer   | http://localhost:8090/api/customer/:pk/        |
|             `DELETE`| delete customer | http://localhost:8090/api/customer/:pk/        |

<br>

### **Sale :**

| **REQUEST METHOD** |        **FUNCTION**         | **ENDPOINT**                           |
| -----------------: | :-------------------------: | :------------------------------------- |
|              `GET` |     list Sales              | http://localhost:8090/api/sales/       |
|             `POST` |     create Sale             | http://localhost:8090/api/sales/       |
|              `GET` |     show Sale               | http://localhost:8090/api/sales/:pk/   |
|           `DELETE` |     delete Sale             | http://localhost:8090/api/sales/:pk/   |

<br>

### **Sales Person Sales :**

| **REQUEST METHOD** |        **FUNCTION**         | **ENDPOINT**                                     |
| -----------------: | :-------------------------: | :----------------------------------------------: |
|              `GET` | list Sales of a sale person | http://localhost:8090/api/salesperson/:pk/sales/ |

<br>

<br>

# <center>**Key React Features**
---