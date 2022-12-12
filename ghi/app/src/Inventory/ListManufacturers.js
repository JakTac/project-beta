import { React, useState, useEffect } from 'react'
import DropDownManufacturerForm from './DropDownManufacturerForm'


function ListManufacturers() {
    const [manufacturers, setManufacturers] = useState([])


    useEffect(() => {
        fetch('http://localhost:8100/api/manufacturers/')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setManufacturers(data.manufacturers)
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
            {manufacturers &&
                <div>
                    <p> </p>
                    <div className='dropdown' style={buttonStyles}>
                        <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false" data-bs-auto-close="outside">Add a Manufacturer</button>
                        <DropDownManufacturerForm />
                    </div>
                    <div style={tableStyles}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Manufacturers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manufacturers.map(manu => {
                                    return (
                                        <tr key={manu.id}>
                                            <td>{manu.name}</td>
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


export default ListManufacturers