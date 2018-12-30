import React, { Component } from 'react';
import Route from '../router/route';

const pugPic = require('../../../assets/busci.jpg');

class Dog extends Component {
    state = {
        dogInfo: null, // fetched info from api
        error: null // api errors
    };

    componentDidMount() {
        // Fetchs the basic dog info
        this.fetchDogInfo(this.props.breed);
    }

    // Fetches dog breed info from wikipedia media api
    // Params:
    //  breed (string) = breed name of the dog to retrieve info
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
            });
    };

    render() {
        // Renders the dog information,
        // If the breed is a pug shows a dog pic through route rendering
        return (
            <div className="dog-content">
                <h2>{this.props.breed}</h2>
                <div>
                    <Route path="/dog/pug">
                        <div className="dog-pug" style={{ backgroundImage: `url(${pugPic})` }} />
                    </Route>
                    <p>{!!this.state.error || this.state.dogInfo}</p>
                </div>
            </div>
        );
    }
}

export default Dog;
