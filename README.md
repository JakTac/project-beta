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

### **Create a Sales Person**

>This feature allows a user to create a sales person by inputting their name and employee number

### **Create a Customer**

>This feature allows a user to create a customer by inputting their name, address, and phone number

### **Create a Sale**

>This feature allows you to create a sale using a customer, customer, automobile and set a price. The form accesses the database of customers, automobiles, and salespeople to display them via a dropdown allowing you to choose which ones to input on the form

### **Filters through automobiles that haven't been sold live**

>When making a sale the automobiles available are all ones that have never been sold. When a sale is made this list automatically updates removing the car that was sold without the page having to be refreshed

### **List of Sales**

>This list displays all of the sales that have been made with all of the information tied to the sale. It also features a link that takes you to the sales of a specific employee

### **Sales Person History**

>This list displays all of the sales that have been made by an individual sales person. You can access this page by clicking on their link on the sales list

### **Create a Technician**

>This feature allows a user to create a technician by inputting their name, and employee number

### **List Technicians**

>This feature lists all of the technicians in the database displaying their name and employee number

### **Create an Appointment**

>This feature allows a user to create an appointment by inputting the customer name, the vin number of the vehicle, the date, the time, the reason, and the technician which can be chosen via a dropdown which gets its list of technicians from the database

### **VIP**

>This feature checks to see if the VIN of the automobile that is being submitted for an appointment is in inventory or was ever in inventory. If it is/was in inventory then the automobile qualafies for the VIP treatment

### **Service Appointment List**

>This list shows all service appointments. It also features a search bar that will show all of the service appointments for that specific automible when you input its vin


<br>

# **Getting the App Started**
---

1. Git clone into your local repository
    `git clone <<repo>>`
2. cd into it
    `cd project-beta`
3. Create a volume and name it beta-data
    `docker volume create beta-data`
4. Build the image
    `docker compose build`
5. Run the containers
    `dokcer compose up`
6. Open browser to http://localhost:3000 to make sure it's running (it may take a minute or two)
7. Once it's up and running, you can begin inputting data. You can access everything via the dropdowns on the NavBar

## Inputting data through Insomnia via the POST method
---

### **Add a Manufacturer**
>  http://localhost:8100/api/manufacturers/

```json
		{
			"name": "Ford"
		}
```

### **Add a Vehicle Model**
>  http://localhost:8100/api/models/

```json
		{
			"name": "Mustang",
  			"manufacturer_id": "1",
			"picture_url": "https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/640x400/quality/80/https://s.aolcdn.com/commerce/autodata/images/USD20FOC051B021001.jpg"
		}
```

### **Add a Automobile Vehicle**
> http://localhost:8100/api/automobiles/

```json
		{
	 		"color": "black",
	 		"year": 2020,
	 		"vin": "123456789",
	 		"model_id": 1
		}
```

### **Add a Technician**
> http://localhost:8080/api/technicians/

```json
		{
			"name": "Jack",
			"employee_number": 12345
		}
```

### **Add a Service Appointment**
> http://localhost:8080/api/appointments/

```json
		{
	 		"vin": "123456789",
            "vip": False,
            "date": "2022-10-24",
	 		"time": "5:30:00",
	 		"reason": "Tire Alignment",
            "customer": "you",
            "completed" False,
	 		"technician": 1
		}
```

### **Add a Sales Person**
> http://localhost:8090/api/salesperson/

```json
		{
			"name": "Alice",
			"employee_number": 001
		}
```

### **Add a Customer**
> http://localhost:8090/api/customer/

``` json
		{
			"name": "Bob",
			"address": "123 Main St",
			"phone_number": "0123456789"
		}
```

### **Add a Sale**
> http://localhost:8090/api/sales/

```json
		{
			"automobile": "123456789",
			"salesperson": 001,
			"customer": 1,
			"price": 100
		}
```
