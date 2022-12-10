import { React, useState, useEffect } from 'react'
import DropDownCreateTechnician from './DropdownTechnicianForm'


function ListTechnicians() {
    const [technicians, setTechnicians] = useState([])


    useEffect(() => {
        fetch('http://localhost:8080/api/technicians/')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setTechnicians(data.technicians)
            })
    }, [])


    const buttonStyles = {
        position: "absolute",
        right: "20px",
    }

    const tableStyles = {
        paddingTop: "30px"
    }

    return (
        <>
            {technicians &&
                <div>
                    <p> </p>
                    <div className='dropdown' style={buttonStyles}>
                        <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false" data-bs-auto-close="outside">Add a Technician</button>
                        <DropDownCreateTechnician />
                    </div>
                    <div style={tableStyles}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Tech Name</th>
                                    <th scope="col">Employee Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {technicians.map(technician => {
                                    return (
                                        <tr key={technician.id}>
                                            <td>{technician.name}</td>
                                            <td>{technician.employee_number}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}
export default ListTechnicians