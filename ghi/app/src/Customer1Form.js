import React from 'react';

class Customer1Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value
        this.setState({ name: value });
    }

    handleAddressChange(event) {
        const value = event.target.value
        this.setState({ address: value });
    }

    handlePhoneNumberChange(event) {
        const value = event.target.value
        this.setState({ phoneNumber: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.phone_number = data.phoneNumber
        delete data.phoneNumber
        console.log(data)

        const customer1Url = 'http://localhost:8090/api/customer/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(customer1Url, fetchConfig)
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer)

            const cleared = {
                name: "",
                address: "",
                phoneNumber: "",
            };
            this.setState(cleared)
        }
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a customer</h1>
                        <form onSubmit={this.handleSubmit} id="create-customer-form">
                        <div className="form-floating-mb-3">
                            <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" value={this.state.name} className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating-mb-3">
                            <input onChange={this.handleAddressChange} placeholder="Address" required type="text" name="address" id="address" value={this.state.address} className="form-control" />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating-mb-3">
                            <input onChange={this.handlePhoneNumberChange} placeholder="Phone number" required type="text" name="phone_number" id="phone_number" value={this.state.phoneNumber} className="form-control" />
                            <label htmlFor="phone_number">Phone number</label>
                        </div>
                        <div>
                             <p></p>
                        </div>
                        <div>
                            <button className="btn btn-primary">Add</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Customer1Form;