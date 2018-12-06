import React, { Component } from 'react';
import Route from '../router/route';

const pugPic = require('../../../assets/busci.jpg');

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
            <div className="dog-content">
                <h2>{this.props.breed}</h2>
                <div>
                    <Route path="/dog/pug">
                        <div className="dog-pug" style={{ backgroundImage: `url(${pugPic})` }} />
                    </Route>
                    <p>{this.state.dogInfo}</p>
                </div>
            </div>
        );
    }
}

export default Dog;
