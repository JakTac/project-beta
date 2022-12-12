import React from 'react';

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log(data);

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(manufacturerUrl, fetchConfig)
        if (response.ok) {
            const newManufacturer = await response.json();
            console.log(newManufacturer)

            const cleared = {
                name: '',
            };
            this.setState(cleared)
        }
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a manufacturer</h1>
                        <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating-mb-3">
                            <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" value={this.state.name} className="form-control" />
                            {/* <label htmlFor="name"> Manufacturer name</label> */}
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
export default ManufacturerForm;