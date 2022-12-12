import React from 'react';

class SaleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autos: [],
            salespeople: [],
            customers: [],
            price: '',
        };
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this)
        this.handleSalespersonChange = this.handleSalespersonChange.bind(this)
        this.handleCustomerChange = this.handleCustomerChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleAutomobileChange(event) {
        const value = event.target.value
        this.setState({ automobile: value });
    }

    handleSalespersonChange(event) {
        const value = event.target.value
        this.setState({ salesperson: value });
    }

    handleCustomerChange(event) {
        const value = event.target.value
        this.setState({ customer: value });
    }

    handlePriceChange(event) {
        const value = event.target.value
        this.setState({ price: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.autos
        delete data.salespeople
        delete data.customers

        const saleUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(saleUrl, fetchConfig)
        if (response.ok) {
            const newSale = await response.json();
            const automobileUrl = 'http://localhost:8090/api/autos/'
            const autoResponse = await fetch(automobileUrl)
            if (autoResponse.ok) {
                const data = await autoResponse.json();
                this.setState({'autos': data.autos.filter(auto => auto.sold === false)})
            }
            console.log(newSale)

            const cleared = {
                automobile: "",
                salesperson: "",
                customer: "",
                price: "",

            }
            this.setState(cleared)
        }
    }

    async componentDidMount() {
        const automobileUrl = 'http://localhost:8090/api/autos/'
        const salespersonUrl = 'http://localhost:8090/api/salesperson/'
        const customer1Url = 'http://localhost:8090/api/customer/'

        const autoResponse = await fetch(automobileUrl)
        const salespersonResponse = await fetch(salespersonUrl)
        const customerResponse = await fetch(customer1Url)

        if (autoResponse.ok) {
            const data = await autoResponse.json();
            this.setState({'autos': data.autos.filter(auto => auto.sold === false)})
        }
        if (salespersonResponse.ok) {
            const data = await salespersonResponse.json();
            this.setState({salespeople: data.salespeople})
        }
    

        if (customerResponse.ok) {
            const data = await customerResponse.json();
            this.setState({customers: data.customers})
        }

    }

    

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a new sale</h1>
                        <form onSubmit={this.handleSubmit} id="create-sale-form">
                        <div className="mb-3">
                            <select onChange={this.handleAutomobileChange} required name="automobile" id="automobile" value={this.state.automobile} className="form-select">
                                <option value="">Choose a automobile</option>
                                {this.state.autos.map(automobile => {
                                    return (
                                        <option value={automobile.vin} key={automobile.id}>
                                            {automobile.vin}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleSalespersonChange} required name="salesperson" id="salesperson" value={this.state.salesperson} className="form-select">
                                <option value="">Choose a salesperson</option>
                                {this.state.salespeople.map(salesperson => {
                                    return (
                                        <option value={salesperson.employee_number} key={salesperson.id}>
                                            {salesperson.name}: {salesperson.employee_number}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleCustomerChange} required name="customer" id="customer" value={this.state.customer} className="form-select">
                                <option value="">Choose a customer</option>
                                {this.state.customers.map(customer => {
                                    return (
                                        <option value={customer.id} key={customer.id}>
                                            {customer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handlePriceChange} placeholder="Price" required type="number" name="price" id="price" value={this.state.price} className="form-control" />
                            <label htmlFor="price">Price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default SaleForm;