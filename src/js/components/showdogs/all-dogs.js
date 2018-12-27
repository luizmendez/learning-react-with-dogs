import React, { Component } from 'react';
import DogCard from './dogcard';
import LazyDog from '../commons/lazydog';

class AllDogs extends Component {
    filterDogs = () => {
        const { filterValue, dogList } = this.props;
        return !!dogList && !!filterValue
            ? dogList.filter(dog => dog.name.includes(filterValue))
            : dogList;
    };

    render() {
        const { dogList, dogListError, filterValue, fetchDogImg } = this.props;
        const filteredDogs = this.filterDogs();
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
                            <DogCard dog={dog} setPath={this.props.setPath} />
                        </LazyDog>
                    ))}
            </div>
        );
    }
}

export default AllDogs;
