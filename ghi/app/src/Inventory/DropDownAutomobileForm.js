import React from "react";

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '',
            year: '',
            vin: '',
            models: [],
        };
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleColorChange(event) {
        const value = event.target.value
        this.setState({ color: value });
    }

    handleYearChange(event) {
        const value = event.target.value
        this.setState({ year: value });
    }

    handleVinChange(event) {
        const value = event.target.value
        this.setState({ vin: value });
    }

    handleModelChange(event) {
        const value = event.target.value
        this.setState({ model_id: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.models
        console.log(data);

        const automobileUrl = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(automobileUrl, fetchConfig)
        if (response.ok) {
            const newAutomobile = await response.json();
            console.log(newAutomobile)

            const cleared = {
                color: "",
                year: "",
                vin: "",
                model_id: "",
            };
            this.setState(cleared)
        }
    }


    async componentDidMount() {
        const url = 'http://localhost:8100/api/models/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ models: data.models });
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} id="create-automobile-form" className="dropdown-menu p-4" style={{width: "400px"}}>
                <div className="form-floating mb-3">
                    <input onChange={this.handleColorChange} placeholder="Color" required type="text" name="color" id="color" value={this.state.color} className="form-control" />
                    <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleYearChange} placeholder="Year" required type="number" name="year" id="year" value={this.state.year} className="form-control" />
                    <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handleVinChange} placeholder="Vin" required type="text" name="vin" id="vin" value={this.state.vin} className="form-control" />
                    <label htmlFor="vin">Vin</label>
                </div>
                <div className="mb-3">
                    <select onChange={this.handleModelChange} required name="model" id="model" value={this.state.model_id} className="form-select">
                        <option value="">Choose a vehicle model</option>
                        {this.state.models.map(model => {
                            return (
                                <option value={model.id} key={model.id}>
                                    {model.name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        )
    }
}
export default AutomobileForm;