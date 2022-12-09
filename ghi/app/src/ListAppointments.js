import { React, useState, useEffect } from 'react'

function ListAppointments() {
    const [appointments, setAppointments] = useState(null)


    useEffect(() => {
        fetch('http://localhost:8080/api/appointments/')
            .then(res => {
                return res.json()
            })
            .then(data => {
                const uncompleted = data.appointments.filter(appointment => appointment.completed === false)
                setAppointments(uncompleted)
            })
    }, [])


    const handleFinished = (appointment) => {
        const appointmentsUrl = `http://localhost:8080/api/appointments/${appointment.id}/`
        appointment.completed = true
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(appointment),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch(appointmentsUrl, requestOptions)
            .then(res => {
                if (res.ok) {
                    window.alert("Appointment was listed as finished.")
                    setAppointments(appointments.filter(appointment => appointment.completed === false))
                } else {
                    window.alert("Something went wrong. Appointment was not listed as finsihed.")
                }
            }
            )
    }


    const handleCancel = (appointment) => {
        const appointmentsUrl = `http://localhost:8080/api/appointments/${appointment.id}/`
        const requestOptions = {
            method: "DELETE",
            body: JSON.stringify(appointment),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch(appointmentsUrl, requestOptions)
            .then(res => {
                return res.json()
            })
            .then(remainingAppointments => {
                if (remainingAppointments) {
                    window.alert("Appointment was canceled")
                    setAppointments(remainingAppointments.filter(appointment => appointment.completed === false))
                } else {
                    window.alert("Something went wrong. Appointment was not deleted.")
                }
            })
    }


    const onChange = (event) => {
        setValue(event.target.value)
    }


    const onSearch = (searchItem) => {
        console.log("search ", searchItem)
    }


    return (
        <>
            {appointments &&
                <div>
                    <div>
                        <p> </p>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="VIN" value={value}
                        aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn btn-primary" type="button" id="button-addon2">Search</button>
                    </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">VIP</th>
                                <th scope="col">VIN</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Technician</th>
                                <th scope="col">Reason For Visit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appointment => {
                                if (appointment.vip === true) {
                                    return (
                                        <tr key={appointment.id}>
                                            <th scope="row">VIP</th>
                                            <td>{appointment.vin}</td>
                                            <td>{appointment.customer}</td>
                                            <td>{appointment.date}</td>
                                            <td>{appointment.time.slice(0, -2)}</td>
                                            <td>{appointment.technician.name}</td>
                                            <td>{appointment.reason}</td>
                                            <td>
                                                <button type="button" className="btn btn-success"
                                                onClick={() => { handleFinished(appointment) }}>Finished</button>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-danger"
                                                    onClick={() => { handleCancel(appointment) }}>Cancel</button>
                                            </td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr key={appointment.id}>
                                            <th scope="row"></th>
                                            <td>{appointment.vin}</td>
                                            <td>{appointment.customer}</td>
                                            <td>{appointment.date}</td>
                                            <td>{appointment.time.slice(0, -3)}</td>
                                            <td>{appointment.technician.name}</td>
                                            <td>{appointment.reason}</td>
                                            <td>
                                                <button type="button" className="btn btn-success"
                                                    onClick={() => { handleFinished(appointment) }}>Finished</button>
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-danger"
                                                    onClick={() => { handleCancel(appointment) }}>Cancel</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}
export default ListAppointments