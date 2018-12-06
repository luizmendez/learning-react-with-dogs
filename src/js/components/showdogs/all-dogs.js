import React, { Component } from 'react';
import DogCard from './dogcard';
import LazyDog from '../commons/lazydog';

class AllDogs extends Component {
    state = {
        dogs: null,
        error: null
    };

    componentDidMount() {
        this.fetchAllDogs();
    }

    allDogsURL = 'https://dog.ceo/api/breeds/list/all';

    fetchAllDogs = () => {
        //console.log('Fetching doggos...');
        if (localStorage.getItem('dogs')) {
            const dogs = JSON.parse(localStorage.getItem('dogs'));
            this.setState({ dogs, error: null });
            return false;
        }
        return fetch(this.allDogsURL)
            .then(r => {
                if (r.status >= 400) {
                    throw new Error('Error fetching dog list.');
                }
                return r.json();
            })
            .then(r => {
                const doglist = [];
                for (const dog in r.message) {
                    doglist.push({
                        name: dog,
                        subBreed: r.message[dog],
                        imgEndpoint: `https://dog.ceo/api/breed/${dog}/images/random`,
                        imgURL: null
                    });
                }
                return doglist;
            })
            .then(dogs => this.setState({ dogs, error: null }))
            .catch(error => {
                this.setState({ error: error.toString() });
                console.error(error);
            });
    };

    filterDogs = () => {
        const { filterValue } = this.props;
        const { dogs } = this.state;
        return !!dogs && !!filterValue ? dogs.filter(dog => dog.name.includes(filterValue)) : dogs;
    };

    fetchDogImg = dogBreed => {
        const dog = this.state.dogs.filter(dog => dog.name === dogBreed)[0];
        //console.log('Fetching doggo image...');
        return fetch(dog.imgEndpoint)
            .then(r => {
                if (r.status >= 400) {
                    throw new Error('There was an error fetching the doggo pic.');
                }
                return r.json();
            })
            .then(img => {
                const newDogList = this.state.dogs.map(dog => {
                    if (dogBreed === dog.name) dog.imgURL = img.message;
                    return dog;
                });
                this.setState({ dogs: newDogList }, this.saveInLocalStorage);
            })
            .catch(error => {
                this.setState({ error: error.toString() });
                console.error(error);
            });
    };

    saveInLocalStorage = () => {
        localStorage.setItem('dogs', JSON.stringify(this.state.dogs));
    };

    render() {
        const { error } = this.state;
        const filteredDogs = this.filterDogs();
        return (
            <div className="cards-container">
                {error && <div>{error}</div>}
                {filteredDogs &&
                    filteredDogs.map(dog => (
                        <LazyDog
                            key={`lazy-${dog.name}`}
                            dogBreed={dog.name}
                            filterValue={this.props.filterValue}
                            imgURL={dog.imgURL}
                            fetchDogImg={this.fetchDogImg}>
                            <DogCard dog={dog} setPath={this.props.setPath} />
                        </LazyDog>
                    ))}
            </div>
        );
    }
}

export default AllDogs;
