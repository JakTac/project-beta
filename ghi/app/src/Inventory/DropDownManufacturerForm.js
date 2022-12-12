import React from 'react';


class DropDownManufacturerForm extends React.Component {
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
        const data = { ...this.state };
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
            const cleared = {
                name: '',
            };
            this.setState(cleared)
        }
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} id="create-manufacturer-form" className='dropdown-menu p-4' style={{width: "400px"}}>
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
        )
    }
}
export default DropDownManufacturerForm;