import React, { Component } from 'react';
import Route from '../router/route';

const pugPic = require('../../../assets/busci.jpg');

const DogStyle = {
    margin: '40px 0'
};
const TitleStyle = {
    margin: '20px 0 40px 0',
    textTransform: 'capitalize'
};
const PugStyle = {
    width: '150px',
    height: '150px',
    float: 'left',
    margin: '0 20px 20px 0',
    backgroundImage: `url(${pugPic})`,
    backgroundRepeat: 'none',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
};

class Dog extends Component {
    state = {
        dogInfo: null,
        error: null
    };

    componentDidMount() {
        this.fetchDogInfo(this.props.breed);
    }

    fetchDogInfo = breed => {
        const wikiURL = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${breed}`;
        return fetch(wikiURL)
            .then(r => {
                if (r.status >= 400) {
                    throw new Error('Error fetching dog info.');
                }
                return r.json();
            })
            .then(r => {
                const { pages } = r.query;
                return pages[Object.keys(pages)[0]].extract;
            })
            .then(dogInfo => this.setState({ dogInfo, error: null }))
            .catch(error => {
                this.setState({ error: error.toString() });
                console.error(error);
            });
    };

    render() {
        return (
            <div style={DogStyle}>
                <h2 style={TitleStyle}>{this.props.breed}</h2>
                <div>
                    <Route path="/dog/pug">
                        <div style={PugStyle} />
                    </Route>
                    <p>{this.state.dogInfo}</p>
                </div>
            </div>
        );
    }
}

export default Dog;
