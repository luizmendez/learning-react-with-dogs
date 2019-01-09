import types from '../constants/action-types';

// Call action dispatch to set the filterValue string when filtering the dog list
export function setDogFilter(filterValue) {
    return {
        type: types.SET_DOG_FILTER,
        filterValue
    };
}

// Looks for a key in localStorage and calls an action to set it in store
// If key don't exist calls an action to fetch it
export function getDogs() {
    const dogsFromLocalStorage = getFromLocalStorage('dogList');
    if (dogsFromLocalStorage) {
        return setDogList(dogsFromLocalStorage);
    }
    return fetchDogs();
}

// Looks for a key in localStorage and returns its value
// @param {string} key - key to look for
// @param {bool} parse - should the retrieved value be parsed
// Returns: whatever was found in local storage
export function getFromLocalStorage(key, parse = true) {
    const dogs = localStorage.getItem(key)
        ? parse
            ? JSON.parse(localStorage.getItem(key))
            : localStorage.getItem(key)
        : false;
    return dogs;
}

// Fetch dog list from API and format it to an array of objects,
// calls the actions to set the list or error corresponding to the fetch response
// @params {string} url - url to API
export function fetchDogs(url = 'https://dog.ceo/api/breeds/list/all') {
    return dispatch =>
        fetch(url)
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
}

// Fetch dog image from API calling the actions to set dog image url
// or error corresponding to the fetch response
// @param {string} dogBreed - breed of the dog to fetch image
// @param {array} dogList - array of objects of dogs
export function fetchDogImg(dogBreed, dogList) {
    const imgEndpoint = `https://dog.ceo/api/breed/${dogBreed}/images/random`;
    const dog = dogList.find(dog => dog.name === dogBreed);
    return dispatch =>
        fetch(imgEndpoint)
            .then(r => {
                if (r.status >= 400) {
                    throw new Error('Unable to fetch dog image url.');
                }
                return r.json();
            })
            .then(img => {
                const dogWithImg = { ...dog, imgURL: img.message, imgError: '' };
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
}

// Calls action dispatch to set dogList on storage
// @params {array} dogList - array of objects containing the dog list
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
// @param {string} error - the error that ocurred
function setDogListError(dogListError) {
    return {
        type: types.SET_DOG_LIST_ERROR,
        dogListError
    };
}

// Calls action dispatch to set dog image on storage
// @param {object} dog - object of the dog to replace in storage
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
// @params {object} dog - object of the dog to replace in storage
export function setDogImgError(dog, dogList) {
    // sets the new list in local storage
    localStorage.setItem('dogList', JSON.stringify(dogList));
    // returns the action to set the list in store
    return {
        type: types.SET_DOG_IMG_ERROR,
        dog
    };
}

// Call action to set the submitted dog in the store
// @params {FormData} submittedDog - FormData object of the submitted dog
function setSubmittedDog(submittedDog) {
    return {
        type: types.SET_SUBMITTED_DOG,
        submittedDog
    };
}

// Handles message list in store
// @param {object} message - object with message attributes
export function setMessage(msg) {
    const message = { ...msg, id: Math.floor(Math.random() * Math.floor(999999999)) };
    return {
        type: types.SET_MESSAGE,
        message
    };
}

// Removes a message from message list in storage
// @param {string} error - the error that ocurred
export function removeMessage(message) {
    return {
        type: types.REMOVE_MESSAGE,
        messageId: message.id
    };
}

// Sends form to backend to be processed and dispatch success or error action
// @param {formData} data - the data to send to the server
// ** At the moment this function always returns error as the API still does not exist **
export function sendDogForm(data) {
    return dispatch =>
        fetch('http://localhost:8080/api/senddogpic', {
            mode: 'no-cors',
            method: 'POST',
            body: data
        })
            .then(r => {
                if (r.status >= 400) {
                    throw new Error('Problem sending Dog Pic, please try again');
                }
                return r.json();
            })
            .then(r => {
                dispatch(
                    setMessage({
                        message: 'Dog submitted with success.',
                        type: 'success'
                    })
                );
                dispatch(setSubmittedDog(r.message));
            })
            .catch(error => {
                dispatch(
                    setMessage({
                        message: error.toString(),
                        type: 'danger'
                    })
                );
            });
}
