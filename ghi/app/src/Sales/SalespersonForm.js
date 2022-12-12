import React from "react";

class SalespersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employeeNumber: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value
        this.setState({ name: value });
    }

    handleEmployeeNumberChange(event) {
        const value = event.target.value
        this.setState({ employeeNumber: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.employee_number = data.employeeNumber
        delete data.employeeNumber

        const salespersonUrl = 'http://localhost:8090/api/salesperson/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salespersonUrl, fetchConfig)
        if (response.ok) {

            const cleared = {
                name: "",
                employeeNumber: "",
            };
            this.setState(cleared)
        }
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a salesperson</h1>
                        <form onSubmit={this.handleSubmit} id="create-salesperson-form">
                        <div className="form-floating-mb-3">
                            <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" value={this.state.name} className="form-control" />
                            <label htmlFor="name"> Salesperson name</label>
                        </div>
                        <div className="form-floating-mb-3">
                            <input onChange={this.handleEmployeeNumberChange} placeholder="Employee number" required type="number" name="employee_number" id="employee_number" value={this.state.employeeNumber} className="form-control" />
                            <label htmlFor="employee_number">Employee number</label>
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

export default SalespersonForm;