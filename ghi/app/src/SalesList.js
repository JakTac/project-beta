import {React, useEffect, useState} from 'react';
import {NavLink, useParams, useNavigate} from 'react-router-dom';

export default function SalesList() {
    const saleUrl = 'http://localhost:8090/api/sales/'
    const [sales, setSales] = useState(null)

    useEffect(()=> {
        fetch(saleUrl)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setSales(data.sales)
        })
    })
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Automobile</th>
                    <th>Price</th>
                    <th>Customer</th>
                    <th>Salesperson</th>
                </tr>
            </thead>
            <tbody>
                {sales?.map(sale => {
                    let salespersonsalesUrl = `${sale.salesperson.employee_number}/`
                    return (
                        <tr key={sale.id}>
                            <td>{ sale.automobile.vin }</td>
                            <td>{ sale.price }</td>
                            <td>{ sale.customer.name }</td>
                            <td>
                                <NavLink to={`salesperson/${salespersonsalesUrl}`} replace="true" >
                                {sale.salesperson.name }: {sale.salesperson.employee_number }
                                </NavLink>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}