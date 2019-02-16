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
export function fetchDogs(url = 'http://localhost:3000/dogs') {
    return dispatch =>
        fetch(url)
            .then(r => {
                if (r.status >= 400) {
                    throw new Error('Unable to fetch dog list.');
                }
                return r.json();
            })
            .then(r => {
                dispatch(setDogList(r));
            })
            .catch(error => dispatch(setDogListError(error.toString())));
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
    return (dispatch, getState) =>
        fetch('http://localhost:3000/image', {
            method: 'POST',
            enctype: 'multipart/form-data',
            body: data
        })
            .then(r => {
                if (r.status >= 400) {
                    throw new Error('Problem sending Dog Pic, please try again');
                }
                return r.json();
            })
            .then(r => {
                const { dogList } = getState();
                const dogIndex = dogList.findIndex(({ id }) => ~~id === ~~r.DogId);
                const currentDog = dogList[dogIndex];
                console.log(currentDog);
                const newList = Object.assign([], dogList, {
                    [dogIndex]: {
                        ...dogList[dogIndex],
                        images: [...dogList[dogIndex].images, { id: r.id, path: r.path }]
                    }
                });
                console.log(newList);
                dispatch(setDogList(newList));
                dispatch(
                    setMessage({
                        message: 'Dog submitted with success.',
                        type: 'success'
                    })
                );
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
