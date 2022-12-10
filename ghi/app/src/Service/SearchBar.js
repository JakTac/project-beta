import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DropDownCreateAppointment from './DropDownCreateAppointment'


function SearchBar() {
    const [vins, setVins] = useState([])
    const [filtered, setFiltered] = useState([])

    const onInputChange = event => {
        if (event.target.value.length > 0) {
            let newlyfiltered = vins.filter(vin => {
                return vin.startsWith(event.target.value.toUpperCase())
            })
            const uniqueVins = [...new Set(newlyfiltered)]
            setFiltered(uniqueVins)
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
                const vins = data.appointments.map(appointment => {
                    return appointment.vin
                })
                setVins(vins)
            })
    }, [])


    return (
        <>
            {filtered &&
                <div>
                    <p> </p>
                    <div className='input-group mb-3'>
                        <div>
                            <input type='text' className='form-control' data-bs-toggle='dropdown'
                            placeholder='Search by VIN' onChange={onInputChange} />
                            <ul className='dropdown-menu'>
                                {filtered.map(vin => {
                                    return (
                                        <li key={vin}>
                                            <Link className='dropdown-item' to={`/${vin}/history/`}>
                                            {vin}</Link>
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