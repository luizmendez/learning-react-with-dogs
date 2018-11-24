import React, { Component } from "react";
import DogCard from "./dogcard";
import LazyDog from "../commons/lazydog";

const DogStyle = {
    margin: "40px 0"
}

class Dog extends Component {
    state = {
    };

    componentDidMount() {
    }

    render() {
        return (
            <div style={DogStyle}>
                <h2>{this.props.breed}</h2>
            </div>
        );
    }
}

export default Dog;
