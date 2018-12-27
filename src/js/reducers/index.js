import types from '../constants/action-types';

const initialState = {
    filterValue: '',
    dogList: [],
    dogListError: ''
};

const defaultAction = {
    type: ''
};

const rootReducer = (state = initialState, action = defaultAction) => {
    switch (action.type) {
        case types.SET_DOG_FILTER:
            return { ...state, filterValue: action.filterValue };
        case types.SET_DOG_LIST:
            return { ...state, dogList: action.dogList };
        case types.SET_DOG_LIST_ERROR:
            return { ...state, dogListError: action.dogListError };
        case types.SET_DOG_IMG: {
            const { dogList } = state;
            const dog = action.dog;
            const newDogList = dogList.map(d => {
                if (d.name === dog.name) {
                    return dog;
                }
                return d;
            });
            return { ...state, dogList: newDogList };
        }
        default:
            return state;
    }
};

export default rootReducer;
