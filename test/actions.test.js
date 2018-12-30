import * as action from '../src/js/actions/';
import types from '../src/js/constants/action-types';
import { mockStore } from '../tools/mockStore';

describe('Dog actions', () => {
    beforeEach(() => {
        localStorage.clear();
        fetch.resetMocks();
    });
    const apiURL = 'https://dog.ceo/api/breeds/list/all';
    const dogListWithoutImages = [
        {
            name: 'affenpinscher',
            subBreed: [],
            imgURL: '',
            imgError: ''
        },
        {
            name: 'african',
            subBreed: [],
            imgURL: '',
            imgError: ''
        },
        {
            name: 'airedale',
            subBreed: [],
            imgURL: '',
            imgError: ''
        }
    ];
    const dogListWithImages = [
        {
            name: 'affenpinscher',
            subBreed: [],
            imgURL: '',
            imgError: ''
        },
        {
            name: 'african',
            subBreed: [],
            imgURL: '',
            imgError: ''
        },
        {
            name: 'airedale',
            subBreed: [],
            imgURL: 'https://images.dog.ceo/breeds/airedale/n02096051_1736.jpg',
            imgError: ''
        }
    ];

    it('Should return the set filter action', () => {
        const filterText = 'Shibe';
        const filterAction = {
            type: types.SET_DOG_FILTER,
            filterValue: 'Shibe'
        };
        expect(action.setDogFilter(filterText)).toEqual(filterAction);
    });

    it('Should return the dog list action', () => {
        const dogListAction = {
            type: types.SET_DOG_LIST,
            dogList: dogListWithoutImages
        };
        expect(action.setDogList(dogListWithoutImages)).toEqual(dogListAction);
    });

    it('Should fetch dog list', () => {
        const apiResponse = JSON.stringify({
            status: 'success',
            message: {
                affenpinscher: [],
                african: [],
                airedale: []
            }
        });

        const expectedAction = {
            type: types.SET_DOG_LIST,
            dogList: dogListWithoutImages
        };

        fetch.mockResponseOnce(apiResponse);
        const store = mockStore({ filterValue: '', dogList: [], dogListError: '' });

        return store.dispatch(action.fetchDogs(apiURL)).then(() => {
            expect(store.getActions()[0]).toEqual(expectedAction);
        });
    });

    it('Should fail and return error fetching dog list from api', () => {
        const error = 'Unable to fetch dogs.';
        const expectedAction = {
            type: types.SET_DOG_LIST_ERROR,
            dogListError: `Error: ${error}`
        };

        fetch.mockReject(new Error(error));
        const store = mockStore({ filterValue: '', dogList: [], dogListError: '' });

        return store.dispatch(action.fetchDogs(apiURL)).then(() => {
            expect(store.getActions()[0]).toEqual(expectedAction);
        });
    });

    it('Should return dogList if it is in Local Storage', () => {
        const KEY = 'dogList';
        const dogListString = JSON.stringify(dogListWithImages);
        localStorage.setItem(KEY, dogListString);
        expect(localStorage.__STORE__[KEY]).toEqual(dogListString);
        expect(action.getFromLocalStorage('dogList')).toEqual(dogListWithImages);
    });

    it('Should return falsy if dogList is not in Local Storage', () => {
        const KEY = 'dogList';
        expect(localStorage.__STORE__[KEY]).toBeFalsy();
        expect(action.getFromLocalStorage(KEY)).toBeFalsy();
    });

    it('Should fetch dog image and call dispatch action to set it to the store', () => {
        const dogBreed = 'airedale';
        const imgURL = 'https://images.dog.ceo/breeds/airedale/n02096051_1736.jpg';
        const apiResponse = JSON.stringify({
            status: 'success',
            message: imgURL
        });

        const expectedAction = {
            type: types.SET_DOG_IMG,
            dog: {
                name: dogBreed,
                imgURL,
                imgError: '',
                subBreed: []
            }
        };

        fetch.mockResponseOnce(apiResponse);
        const store = mockStore({
            filterValue: '',
            dogList: dogListWithoutImages,
            dogListError: ''
        });

        return store.dispatch(action.fetchDogImg(dogBreed, dogListWithoutImages)).then(() => {
            expect(store.getActions()[0]).toEqual(expectedAction);
        });
    });

    it('Should fail and return error fetching dog image from api', () => {
        const dogBreed = 'airedale';
        const expectedAction = {
            type: types.SET_DOG_IMG,
            dog: {
                name: dogBreed,
                imgURL: '',
                imgError: 'Error: Unable to fetch dog image.',
                subBreed: []
            }
        };

        const error = 'Unable to fetch dog image.';
        fetch.mockReject(new Error(error));
        const store = mockStore({ filterValue: '', dogList: [], dogListError: '' });

        return store.dispatch(action.fetchDogImg(dogBreed, dogListWithoutImages)).then(() => {
            expect(store.getActions()[0]).toEqual(expectedAction);
        });
    });
});
