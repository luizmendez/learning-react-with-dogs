import React, { Component } from "react";
import DogCard from "./dogcard";

class AllDogs extends Component {
    state = {
        dogs: null,
        error: null
    };

    componentDidMount() {
        this.fetchAllDogs();
    }

    allDogsURL = "https://dog.ceo/api/breeds/list/all";

    fetchAllDogs = () => {
        console.log('Fetching doggos...');
        return fetch(this.allDogsURL)
            .then(r => {
                if (r.status >= 400) {
                    throw new Error("Error fetching dog list.");
                }
                return r.json();
            })
            .then(r => {
                const doglist = [];
                for (const dog in r.message) {
                    doglist.push({
                        name: dog,
                        subBreed: r.message[dog],
                        imgURL: "https://dog.ceo/api/breed/"+dog+"/images/random"
                    })
                }
                return doglist;
            })
            .then(dogs => this.setState({dogs, error: null}))
            .catch(error => {
                this.setState({error: error.toString()});
                console.log(error);
            });
    };

    render() {
        const {dogs, error} = this.state;
        const cardsContainerStyle = {
            margin: "40px 0",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between"
        }
        return (
            <div style={cardsContainerStyle}>
                { error && <div>{error}</div>}
                { dogs && dogs.map( dog =>
                    <DogCard key={dog.name} name={dog.name} subBreed={dog.subBreed} imgURL={dog.imgURL} /> 
                ) }
            </div>
        );
    }
}

export default AllDogs;
