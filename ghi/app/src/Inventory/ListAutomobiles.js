import { React, useState, useEffect } from 'react'
import DropDownAutomobileForm from './DropDownAutomobileForm'


function ListAutomobiles() {
    const [automobiles, setAutomobiles] = useState([])


    useEffect(() => {
        fetch('http://localhost:8100/api/automobiles/')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setAutomobiles(data.autos)
            })
    }, [])


    const buttonStyles = {
        paddingTop: "35px",
        position: "absolute",
        right: "20px",
    }


    const addPadding = {
        paddingTop: "60px"
    }


    return (
        <div>
            <div className='dropdown' style={buttonStyles}>
                <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
                    aria-expanded="false" data-bs-auto-close="outside">Add an Automobile</button>
                <DropDownAutomobileForm />
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4" style={addPadding}>
                {automobiles.map(auto => {
                    return (
                        <div className="col-sm-6" key={auto.id}>
                            <div className="card mb-3 shadow">
                                <img src={auto.model.picture_url} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{auto.vin}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{auto.color} {auto.year} {auto.model.manufacturer.name} {auto.model.name}</h6>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default ListAutomobiles