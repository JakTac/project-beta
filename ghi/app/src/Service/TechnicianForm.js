import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function CreateTechnician (props) {
    let navigate = useNavigate()
    const initialState = {
        name: '',
        employee_number: '',
    }
    const [details, setDetails] = useState(initialState)


    const handleChange = (e) => {
        const {name, value} = e.target
        setDetails((prev) => {
            return {...prev, [name]: value}
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
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
                    if (JSON.stringify(result).id !== undefined) {
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
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a new technician</h1>
                        <form onSubmit={handleSubmit} id="create-conference-form">
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
                    </div>
                </div>
            </div>
        </>
    )

}
export default CreateTechnician