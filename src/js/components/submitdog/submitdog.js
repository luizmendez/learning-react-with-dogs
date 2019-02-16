import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubmitDog extends Component {
    static propTypes = {
        dogList: PropTypes.array,
        sendDogForm: PropTypes.func
    };

    state = {
        dogPicName: 'Choose File', // Name of the image selected
        dogUrlURL: '' // URL of image selected
    };

    // Reference to the preview image element
    dogPicInput = React.createRef();

    // On Event Trigger sets the image name and URL in state
    handlePicChange = () => {
        const [pic] = this.dogPicInput.current.files;
        this.setState({
            dogPicName: pic.name,
            dogPicURL: URL.createObjectURL(pic)
        });
    };

    // On submit prevent default and send data to a redux action call
    handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        // Create formData to send data
        const data = new FormData();
        // Iterate each form element to get its value
        Object.values(form.elements).forEach(field => {
            if (!field.name || !field.value) {
                return false;
            }
            // If field is not of file type get name and value and append to formData
            if (field.getAttribute('type') !== 'file') data.append(field.name, field.value);
            // If field is of file type, get the files and append to formData
            if (field.getAttribute('type') === 'file') {
                const [pic] = field.files;
                data.append(field.name, pic);
            }
        });
        // Send formData to the action call
        this.props.sendDogForm(data);
    };

    render() {
        const { dogPicName, dogPicURL } = this.state;
        // Renders the form to submit a dog image
        // also renders an image element to preview the image to be submitted
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
                                        <option key={`option-${dog.id}`} value={dog.id}>
                                            {dog.breed}
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
