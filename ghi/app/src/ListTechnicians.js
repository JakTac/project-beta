import { React, useState, useEffect } from 'react'


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


    return (
        <>
            {technicians &&
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
            }
        </>
    )
}
export default ListTechnicians