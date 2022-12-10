import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DropDownCreateAppointment from './DropDownCreateAppointment'


function SearchBar() {
    const [appointments, setAppointments] = useState([])
    const [filtered, setFiltered] = useState([])


    const onInputChange = event => {
        if (event.target.value.length > 0) {
            setFiltered(appointments.filter(appointment => {
                return appointment.vin.startsWith(event.target.value.toUpperCase())
            }))
        } else {
            setFiltered([])
        }
    }


    useEffect(() => {
        fetch('http://localhost:8080/api/appointments/')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setAppointments(data.appointments)
            })
    }, [])


    const inputStyles = {
        float: "right"
    }

    const buttonStyles = {
        width: "100%"
    }



    return (
        <>
            {appointments &&
                <div>
                    <p> </p>
                    <div className='input-group mb-3'>
                        <div>
                            <input type='text' className='form-control' data-bs-toggle='dropdown'
                            placeholder='Search by VIN' onChange={onInputChange} />
                            <ul className='dropdown-menu'>
                                {filtered.map(appointment => {
                                    return (
                                        <li key={appointment.vin}>
                                            <Link className='dropdown-item' to={`/${appointment.vin}/history/`}>
                                            {appointment.vin}</Link>
                                        </li>
                                    )
                                }).slice(0, 5)
                                }
                            </ul>
                        </div>
                        <div className='dropdown'>
                            <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false" data-bs-auto-close="outside">Create an Appointment</button>
                            <DropDownCreateAppointment />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default SearchBar