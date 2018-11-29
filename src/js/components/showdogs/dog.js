import React, { Component } from 'react';

const DogStyle = {
    margin: '40px 0'
};

class Dog extends Component {
    state = {};

    componentDidMount() {}

    render() {
        return (
            <div style={DogStyle}>
                <h2>{this.props.breed}</h2>
            </div>
        );
    }
}

export default Dog;
