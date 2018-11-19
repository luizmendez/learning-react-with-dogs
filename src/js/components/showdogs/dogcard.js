import React, { Component } from "react";
import DogPic from "./dogpic";

const cardStyle = {
    width: '30%',
    margin: '15px 0',
    height: '426px'
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

    render() {
        const {imgURL, name} = this.props;
        return (
            <div className="card" style={cardStyle}>
                <DogPic imgURL={this.props.imgURL} />
                <div className="card-body">
                    <h5 className="card-title" style={capStyle}>{name}</h5>
                </div>
            </div>
        );
    }
}

export default DogCard;
