import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function DropDownCreateTechnician(props) {
    let navigate = useNavigate()
    const initialState = {
        name: '',
        employee_number: '',
    }
    const [details, setDetails] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target
        setDetails((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(details)
        const techniciansUrl = 'http://localhost:8080/api/technicians/'
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(details),
        }
        fetch(techniciansUrl, requestOptions)
            .then(res => {
                return res.json();
            })
            .then(result => {
                try {
                    console.log(result)
                    if (JSON.stringify(result).id != undefined > 0) {
                        window.alert("Technician was created.")
                        navigate("/technicians")
                    } else {
                        window.alert("Something went wrong. Technician was not created.")
                    }
                } catch {
                    console.error("Something went wrong. Technician was not created")
                }
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="dropdown-menu p-4" style={{width: "300px"}}>
                <div className="form-floating mb-3">
                    <input onChange={handleChange} placeholder="name"
                        required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleChange} placeholder="employee_number"
                        required type="text" name="employee_number" id="employee_number" className="form-control" />
                    <label htmlFor="employee_number">Employee Number</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </>
    )

}
export default DropDownCreateTechnician