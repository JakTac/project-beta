import {React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

export default function SalespersonSales() {
    let spotId = useParams()
    const displaySpot = parseInt(spotId.id)
    console.log(displaySpot)
    const salesUrl = `http://localhost:8090/api/salesperson/${displaySpot}/sales/`
    const [salespersonSales, setSalespersonSales] = useState(null)

    useEffect(()=> {
        fetch(salesUrl)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setSalespersonSales(data)
        })
    })
    
    return (
        <table className="table table-striped">
        <thead>
            <tr>
                <th>Sales person</th>
                <th>Customer</th>
                <th>Vin</th>
                <th>Sale price</th>
            </tr>
        </thead>
        <tbody>
            {salespersonSales?.map(sale => {
                return (
                    <tr key={sale.id}>
                        <td>{sale.salesperson.name }</td>
                        <td>{ sale.customer.name }</td>
                        <td>{ sale.automobile.vin }</td>
                        <td>${ sale.price }</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    )
}