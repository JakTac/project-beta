import { React, useState, useEffect } from 'react'
import DropDownModelForm from './DropDownModelForm'


function ListModels() {
    const [models, setModels] = useState([])


    useEffect(() => {
        fetch('http://localhost:8100/api/models/')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setModels(data.models)
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
            {models &&
                <div>
                    <p> </p>
                    <div className='dropdown' style={buttonStyles}>
                        <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false" data-bs-auto-close="outside">Add a Model</button>
                        <DropDownModelForm />
                    </div>
                    <div style={tableStyles}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Models</th>
                                    <th scope="col">Manufacturer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {models.map(model => {
                                    return (
                                        <tr key={model.id}>
                                            <td>{model.name}</td>
                                            <td>{model.manufacturer.name}</td>
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
export default ListModels