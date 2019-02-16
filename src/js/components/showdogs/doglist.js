import React, { Component } from 'react';
import DogCard from './dogcard';
import LazyDog from './lazydog';
import PropTypes from 'prop-types';

class DogList extends Component {
    static propTypes = {
        dogList: PropTypes.array,
        dogListError: PropTypes.string
    };

    // Filters the dog list regarding the value of filterValue
    filterDogs = () => {
        const { filterValue, dogList } = this.props;
        // if the dogList is set and there is a filterValue return a new array
        // by using array.filter matching the dog breed name to the filterValue,
        // if there is not a filterValue setted return the complete dogList
        return dogList.length && filterValue
            ? dogList.filter(dog => dog.breed.includes(filterValue))
            : dogList;
    };

    render() {
        const { dogList, dogListError, filterValue } = this.props;
        const filteredDogs = this.filterDogs();

        // If there is no error and the dogList is set, iterate the dogList and render each dog
        // as a DogCard component wrapped in LazyDog HOC
        return (
            <div className="cards-container">
                {dogListError && <div>{dogListError}</div>}
                {filteredDogs &&
                    filteredDogs.map(dog => (
                        <LazyDog
                            key={dog.id}
                            dogBreed={dog.breed}
                            filterValue={filterValue}
                            dogList={dogList}>
                            <DogCard dog={dog} />
                        </LazyDog>
                    ))}
            </div>
        );
    }
}

export default DogList;
