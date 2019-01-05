import types from '../constants/action-types';

const initialState = {
    filterValue: '', // string value to filter dog list
    dogList: [], // array of objects used as the dog list
    dogListError: '', // string of the error while fetching the dog list
    messagesList: [] // array of objects used in message handling
};

// assign default action call to be an empty string
// to be able to return all store if not action was sent
const defaultAction = {
    type: ''
};

// maps the dog list and compares breeds with the dog object that is received,
// if there's a match return dog object instead of the object in the list
// @param {object} dog - object with the dog data to inject
// @param {array} dogList - array of objects of the dog list
const injectDog = (dog, dogList) =>
    dogList.map(d => {
        if (d.name === dog.name) {
            return dog;
        }
        return d;
    });

const rootReducer = (state = initialState, action = defaultAction) => {
    switch (action.type) {
        case types.SET_DOG_FILTER:
            // sets the dog list filter value in store
            return { ...state, filterValue: action.filterValue };
        case types.SET_DOG_LIST:
            // sets the dog list filter value in store
            return { ...state, dogList: action.dogList };
        case types.SET_DOG_LIST_ERROR:
            // sets the error response of fetching the dog list in store
            return { ...state, dogListError: action.dogListError };
        case types.SET_DOG_IMG: {
            // get a dog list with the appropiate dog object updated
            const dogList = injectDog(action.dog, state.dogList);
            // sets dog list with image on store
            return { ...state, dogList };
        }
        case types.SET_DOG_IMG_ERROR: {
            // get a dog list with the appropiate dog object updated
            const dogList = injectDog(action.dog, state.dogList);
            // sets dog list with image error on store
            return { ...state, dogList };
        }
        case types.SET_MESSAGE: {
            // sets message list with the new message in store
            return {
                ...state,
                messagesList: [...state.messagesList, action.message]
            };
        }
        case types.REMOVE_MESSAGE: {
            // filters messageList to remove message that matches id and sets it in store
            const messagesList = state.messagesList.filter(
                message => message.id !== action.messageId
            );
            return {
                ...state,
                messagesList
            };
        }
        default:
            // if not action.type matches anything, return the whole state
            return state;
    }
};

export default rootReducer;
