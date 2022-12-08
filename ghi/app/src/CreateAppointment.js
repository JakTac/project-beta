import { React, useState, useEffect } from 'react'

function CreateAppointment (props) {
    const initialState = {
        vin: '',
        vip: false,
        date: '',
        time: '',
        reason: '',
        customer: '',
        completed: false,
        technicians: [],
    }
    const [details, setDetails] = useState(initialState)
    const [technicians, setTechnicians] = useState(null)
    const [automobiles, setAutomobiles] = useState(null)

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:8080/api/technicians/'),
            fetch('http://localhost:8100/api/automobiles/'),
        ])
                .then(([resTechnicians, resAutomobiles]) =>
                    Promise.all([resTechnicians.json(), resAutomobiles.json()])
                )
                .then(([dataTechnicians, dataAutomobiles]) => {
                    setTechnicians(dataTechnicians.technicians)
                    setAutomobiles(dataAutomobiles.autos)
                })
    }, [])


    function checkForVIP(details, automobiles) {
        let result = false
        return automobiles.map(auto => {
            if (auto.vin == details.vin) {
                result = true
            }
            return result
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setDetails((prev) => {
            return {...prev, [name]: value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const [vipStatus] = checkForVIP(details, automobiles)
        details.vip = vipStatus
        console.log(`vipstatus: ${vipStatus}`)
        delete details.technicians
        const appointmentsUrl = 'http://localhost:8080/api/appointments/'
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch(appointmentsUrl, requestOptions)
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result)
            try {
                if (JSON.stringify(result).id != undefined > 0) {
                    window.alert("Appointment was created.")
                } else {
                    window.alert("Something went wrong. Appointment was not created.")
                }
            } catch {
                console.error("Something went wrong. Appointment was not created")
            }
        })
    }

    return (
        <>
            {technicians &&
                <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create Appointment</h1>
                        <form onSubmit={handleSubmit} id="create-conference-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleChange} placeholder="customer"
                                required type="text" name="customer" id="customer" className="form-control" />
                                <label htmlFor="customer">Customer</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleChange} placeholder="vin"
                                required type="text" name="vin" id="vin" className="form-control" />
                                <label htmlFor="vin">VIN Number</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleChange} placeholderdate="date"
                                required type="date" name="date" id="date" className="form-control" />
                                <label htmlFor="date">Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleChange} placeholder="time"
                                required type="time" name="time" id="time" className="form-control" />
                                <label htmlFor="time">Time</label>
                            </div>
                            <div className="form-floating mb-3">
                                <textarea onChange={handleChange} placeholder="reason" rows="3"
                                required name="reason" id="reason" className="form-control" />
                                <label htmlFor="reason">Reason for visit</label>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleChange} required id="technician" name="technician" className="form-select">
                                    <option value="">Choose a technician</option>
                                    {technicians.map(technician => {
                                        return (
                                            <option key={technician.id} value={technician.employee_number}>
                                                {technician.name}
                                            </option>
                                         )
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    )

}
export default CreateAppointment