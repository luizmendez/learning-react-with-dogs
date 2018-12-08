import React, { Component } from 'react';

class SubmitDog extends Component {
    state = {
        dogNameList: null,
        dogName: '',
        dogBreed: '',
        dogPicName: 'Choose File',
        dogUrlURL: null
    };

    componentDidMount() {
        const dogs = JSON.parse(localStorage.getItem('dogs')) || this.dogsDefault;
        const dogNameList = dogs.map(dog => dog.name);
        this.setState({
            dogNameList
        });
    }

    dogPicInput = React.createRef();

    dogsDefault = [
        { name: 'pug' },
        { name: 'shibe' },
        { name: 'mix' },
        { name: 'beagle' },
        { name: 'husky' }
    ];

    handleDogInput = e => {
        const val = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: val
        });
    };

    handlePicChange = () => {
        const [pic] = this.dogPicInput.current.files;
        this.setState({
            dogPicName: pic.name,
            dogPicURL: URL.createObjectURL(pic)
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData();
        Object.values(form.elements).forEach(field => {
            if (field.name && field.value && field.getAttribute('type') !== 'file')
                formData.append(field.name, field.value);
            if (field.getAttribute('type') === 'file') {
                const [pic] = field.files;
                formData.append(field.name, pic);
            }
        });
        this.sendDogPic(formData);
    };

    sendDogPic = data => {
        fetch('http://localhost:8080/api/senddogpic', {
            mode: 'no-cors',
            method: 'POST',
            body: data
        })
            .then(r => {
                if (r.status >= 400) {
                    throw new Error('Problem sending Dog Pic, please try again');
                }
                return r.json();
            })
            .then(r => {
                this.setState({
                    response: r.message,
                    error: null
                });
            })
            .catch(error => {
                this.setState({ error: error.toString() });
            });
    };

    render() {
        const { dogPicName, dogPicURL, response, error } = this.state;
        const responseMessage = error ? error : response;
        const errorClass = error ? ' error' : '';
        return (
            <div className="submit-dog-content">
                <h2>Submit a Dog Pic</h2>
                <p>To submit a dog pic, fill all the fields below and submit the form.</p>
                <div className="row">
                    <form className="col-md-6" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="submitDogName">Dog&#39;s Name</label>
                            <input
                                type="text"
                                id="submitDogName"
                                name="dogName"
                                className="form-control"
                                placeholder="Ramona"
                                value={this.state.dogName}
                                onChange={this.handleDogInput}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="submitDogBreed">Dog&#39;s Breed</label>
                            <select
                                className="form-control"
                                id="submitDogBreed"
                                name="dogBreed"
                                value={this.state.dogBreed}
                                onChange={this.handleDogInput}
                                required>
                                {this.state.dogNameList &&
                                    this.state.dogNameList.map(dog => (
                                        <option key={`option-${dog}`} value={dog}>
                                            {dog}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Dog&#39;s Picture</label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    ref={this.dogPicInput}
                                    className="custom-file-input"
                                    id="customFile"
                                    name="dogPic"
                                    accept="image/*"
                                    onChange={this.handlePicChange}
                                    required
                                />
                                <label className="custom-file-label" htmlFor="customFile">
                                    {dogPicName}
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <div className={`send-response${errorClass}`}>{responseMessage}</div>
                    </form>
                    <div className="pic-preview col-md-6">
                        <img src={dogPicURL} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmitDog;
