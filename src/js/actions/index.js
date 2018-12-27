import types from '../constants/action-types';

// Call action dispatch to set the filter string of search
// Params:
//  filter (string) = filter searchword
export function setDogFilter(filterValue) {
    return {
        type: types.SET_DOG_FILTER,
        filterValue
    };
}

// Look for dogList in localStorage, if not found fetches list through API,
// when dogList is retrieved calls function to dispatch action to set list in store
export function getDogs() {
    const dogsFromLocalStorage = getFromLocalStorage('dogList');
    if (dogsFromLocalStorage) {
        return setDogList(dogsFromLocalStorage);
    }
    return fetchDogs();
}

// Look key from local storage and return parsed object
// Params:
//  key (string) = key of param to look on local storage
//  parse (bool) = if value retirved must be parsed before returning [default = true]
// Returns: Object of what was found in local storage
export function getFromLocalStorage(key, parse = true) {
    const dogs = localStorage.getItem(key)
        ? parse
            ? JSON.parse(localStorage.getItem(key))
            : localStorage.getItem(key)
        : false;
    return dogs;
}

// Fetch dog list from API and format it to an array of Objects,
// calling the actions to set dogList or error corresponding to the fetch response
// Params:
//  url(string) = url to api [default = all dogs breed url]
export function fetchDogs(url = 'https://dog.ceo/api/breeds/list/all') {
    return dispatch => {
        return fetch(url)
            .then(r => {
                if (r.status >= 400) {
                    throw new Error('Unable to fetch dog list.');
                }
                return r.json();
            })
            .then(r => {
                const dogList = Object.keys(r.message).map(dog => ({
                    name: dog,
                    subBreed: r.message[dog],
                    imgURL: '',
                    imgError: ''
                }));
                dispatch(setDogList(dogList));
            })
            .catch(error => dispatch(setDogListError(error.toString())));
    };
}

// Fetch dog image from API calling the actions to set dog image url
// or error corresponding to the fetch response
// Params:
//  dogBreed(string) = breed of the dog to fetch image
//  dogList(array) = array of objects of dogs
export function fetchDogImg(dogBreed, dogList) {
    const imgEndpoint = `https://dog.ceo/api/breed/${dogBreed}/images/random`;
    const dog = dogList.find(dog => dog.name === dogBreed);
    return dispatch => {
        return fetch(imgEndpoint)
            .then(r => {
                if (r.status >= 400) {
                    throw new Error('Unable to fetch dog image url.');
                }
                return r.json();
            })
            .then(img => {
                const dogWithImg = { ...dog, imgURL: img.message };
                const newDogList = dogList.map(dog => {
                    if (dog.name === dogBreed) {
                        return dogWithImg;
                    }
                    return dog;
                });
                dispatch(setDogImg(dogWithImg, newDogList));
            })
            .catch(error => {
                const dogWithImgError = { ...dog, imgError: error.toString() };
                const newDogList = dogList.map(dog => {
                    if (dog.name === dogBreed) {
                        return dogWithImgError;
                    }
                    return dog;
                });
                dispatch(setDogImg(dogWithImgError, newDogList));
            });
    };
}

// Calls action dispatch to set dogList on storage
// Params:
//  dogList (array) = an array of objects containing the dogList
export function setDogList(dogList) {
    // sets the new list in local storage
    localStorage.setItem('dogList', JSON.stringify(dogList));
    // returns the action to set the list in store
    return {
        type: types.SET_DOG_LIST,
        dogList
    };
}

// If there is an error retrieving the dogList call action to set error on store
// Params:
//  error (string) = the error wich ocurred
function setDogListError(dogListError) {
    return {
        type: types.SET_DOG_LIST_ERROR,
        dogListError
    };
}

// Calls action dispatch to set dog image on storage
// Params:
//  dog (obj) = object of the dog to replace in storage
export function setDogImg(dog, dogList) {
    // sets the new list in local storage
    localStorage.setItem('dogList', JSON.stringify(dogList));
    // returns the action to set the list in store
    return {
        type: types.SET_DOG_IMG,
        dog
    };
}

// Calls action dispatch to set dog image error on storage
// Params:
//  dog (obj) = object of the dog to replace in storage
export function setDogImgError(dog, dogList) {
    // sets the new list in local storage
    localStorage.setItem('dogList', JSON.stringify(dogList));
    // returns the action to set the list in store
    return {
        type: types.SET_DOG_IMG_ERROR,
        dog
    };
}