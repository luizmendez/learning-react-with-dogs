import React, { Component } from "react";
import Image from "../commons/image";
import DogPic from "./dogpic";

const cardStyle = {
    width: '30%',
    margin: '15px 0'
};
const capStyle = {
    textTransform: 'capitalize'
};
const errDiv = {
    margin: "10px 0",
    color: "#FF0000",
    fontWeight: "bold"
};

class DogCard extends Component {
    state = {
        imgURL: null,
        error: null
    };

    componentDidMount() {
        this.fetchDogImg();
    }

    fetchDogImg = () => {
        console.log('Fetching doggo image...');
        return fetch(this.props.imgURL)
            .then(r => {
                if (r.status >= 400) {
                    throw new Error("There was an error fetching the doggo pic.");
                }
                return r.json();
            })
            .then(img => this.setState({imgURL: img.message, error: null}))
            .catch(error => {
                this.setState({error: error.toString()});
                console.log(error);
            });
    };

    render() {
        const {imgURL, error} = this.state;
        const name = this.props.name;
        return (
            <div className="card" style={cardStyle}>
                { error && <div style={errDiv}>{error}</div>}
                { !error && imgURL && 
                    <DogPic imgURL={imgURL} />                
                }
                <div className="card-body">
                    <h5 className="card-title" style={capStyle}>{name}</h5>
                </div>
            </div>
        );
    }
}

export default DogCard;
