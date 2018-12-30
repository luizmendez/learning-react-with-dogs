import React, { Component } from 'react';
import DogCard from './dogcard';
import LazyDog from '../lazydog';
import PropTypes from 'prop-types';

class AllDogs extends Component {
    static propTypes = {
        dogList: PropTypes.array,
        dogListError: PropTypes.string,
        fetchDogImg: PropTypes.func
    };

    // Filters the dog list regarding the value of filterValue
    filterDogs = () => {
        const { filterValue, dogList } = this.props;
        // if the dogList is setted and there is a filterValue return a new array
        // by using array.filter matching the dog breed name to the filterValue,
        // if there is not a filterValue setted return the complete dogList
        return !!dogList && !!filterValue
            ? dogList.filter(dog => dog.name.includes(filterValue))
            : dogList;
    };

    render() {
        const { dogList, dogListError, filterValue, fetchDogImg } = this.props;
        const filteredDogs = this.filterDogs();

        // If there is no error and the dogList is setted, iterate the dogList and render each dog
        // as a DogCard component wrapped in LazyDog HOC
        return (
            <div className="cards-container">
                {dogListError && <div>{dogListError}</div>}
                {filteredDogs &&
                    filteredDogs.map(dog => (
                        <LazyDog
                            key={`lazy-${dog.name}`}
                            dogBreed={dog.name}
                            filterValue={filterValue}
                            imgURL={dog.imgURL}
                            fetchDogImg={fetchDogImg}
                            dogList={dogList}>
                            <DogCard dog={dog} />
                        </LazyDog>
                    ))}
            </div>
        );
    }
}

export default AllDogs;
