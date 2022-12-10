import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SearchBar from './SearchBar'

function VinHistory() {
    const [appointments, setAppointments] = useState(null)
    const ObjectVin = useParams()
    const stringVin = JSON.stringify(ObjectVin.id).slice(1, -1)


    useEffect(() => {
        fetch(`http://localhost:8080/api/${stringVin}/appointments/`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setAppointments(data)
            })
    }, [])


    return (
        <>
            <SearchBar />
            {appointments &&
                <div>
                    {appointments.map(appointment => {
                        if (appointment.vip === false) {
                            return (
                                <div key={appointment.id}>
                                    <h1 style={{ padding: "10px", margin: "auto", }}> VIP </h1>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Customer Name</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Technician</th>
                                                <th scope="col">Reason For Visit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{appointment.customer}</td>
                                                <td>{appointment.date}</td>
                                                <td>{appointment.time.slice(0, -3)}</td>
                                                <td>{appointment.technician.name}</td>
                                                <td>{appointment.reason}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        } else {
                            return (
                                <table className="table"  key={appointment.id}>
                                    <thead>
                                        <tr>
                                            <th scope="col">Customer Name</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Technician</th>
                                            <th scope="col">Reason For Visit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{appointment.customer}</td>
                                            <td>{appointment.date}</td>
                                            <td>{appointment.time.slice(0, -3)}</td>
                                            <td>{appointment.technician.name}</td>
                                            <td>{appointment.reason}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                        }
                    })
                    }
                </div>
            }
        </>
    )
}
export default VinHistory