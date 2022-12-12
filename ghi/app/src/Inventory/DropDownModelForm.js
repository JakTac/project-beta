import React from "react";


class DropDownModelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pictureUrl: '',
            manufacturers: [],
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleNameChange(event) {
        const value = event.target.value
        this.setState({ name: value })
    }


    handlePictureUrlChange(event) {
        const value = event.target.value
        this.setState({ pictureUrl: value })
    }


    handleManufacturerChange(event) {
        const value = event.target.value
        this.setState({ manufacturer_id: value })
    }


    async handleSubmit(event) {
        event.preventDefault()
        const data = { ...this.state };
        data.picture_url = data.pictureUrl
        delete data.pictureUrl
        delete data.manufacturers

        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };


        const response = await fetch(modelUrl, fetchConfig)
        if (response.ok) {
            const newModel = await response.json();

            const cleared = {
                name: "",
                pictureUrl: "",
                manufacturer_id: "",
            };
            this.setState(cleared)
        }
    }


    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({ manufacturers: data.manufacturers });
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} id="create-model-form" className="dropdown-menu p-4"
            style={{ width: "400px" }}>
                <div className="form-floating mb-3">
                    <input onChange={this.handleNameChange} placeholder="Name" required type="text"
                    name="name" id="name" value={this.state.name} className="form-control" />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handlePictureUrlChange} placeholder="Url" required type="url"
                    name="picture_url" id="picture_url" value={this.state.pictureUrl} className="form-control" />
                    <label htmlFor="picture_url">Picture url</label>
                </div>
                <div className="mb-3">
                    <select onChange={this.handleManufacturerChange} required name="manufacturer"
                    id="manufacturer" value={this.state.manufacturer_id} className="form-select">
                        <option value="">Choose a manufacturer</option>
                        {this.state.manufacturers.map(manufacturer => {
                            return (
                                <option value={manufacturer.id} key={manufacturer.id}>
                                    {manufacturer.name}
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

export default DropDownModelForm;