import React, { Component } from 'react';

class SubmitDog extends Component {
    state = {
        dogPicName: 'Choose File',
        dogUrlURL: null,
        submitDogSuccess: ''
    };

    dogPicInput = React.createRef();

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
            if (!field.name || !field.value) {
                return false;
            }
            if (field.getAttribute('type') !== 'file') formData.append(field.name, field.value);
            if (field.getAttribute('type') === 'file') {
                const [pic] = field.files;
                formData.append(field.name, pic);
            }
        });
        this.props.sendDogForm(formData);
    };

    render() {
        const { dogPicName, dogPicURL, submitDogSuccess } = this.state;
        return (
            <div className="submit-dog-content">
                <h2>Submit a Dog Pic</h2>
                <p>To submit a dog pic, fill all the fields below and submit the form.</p>
                <div className="row">
                    <form className="col-md-6 form-dog" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="submitDogName">Dog&#39;s Name</label>
                            <input
                                type="text"
                                id="submitDogName"
                                name="dogName"
                                className="form-control"
                                placeholder="Ramona"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="submitDogBreed">Dog&#39;s Breed</label>
                            <select
                                className="form-control"
                                id="submitDogBreed"
                                name="dogBreed"
                                required>
                                {this.props.dogList &&
                                    this.props.dogList.map(dog => (
                                        <option key={`option-${dog.name}`} value={dog.name}>
                                            {dog.name}
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
                        {!!submitDogSuccess && (
                            <div className="send-response">{submitDogSuccess}</div>
                        )}
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
