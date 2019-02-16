import * as action from '../src/js/actions/';
import types from '../src/js/constants/action-types';
import { mockStore } from '../tools/mockStore';

describe('Dog actions', () => {
    beforeEach(() => {
        localStorage.clear();
        fetch.resetMocks();
    });
    const apiURL = 'https://dog.ceo/api/breeds/list/all';
    const dogList = [
        {
            breed: 'affenpinscher',
            id: 1,
            images: [
                'https://images.dog.ceo/breeds/affenpinscher/n02110627_10147.jpg',
                'https://images.dog.ceo/breeds/affenpinscher/n02110627_10148.jpg',
                'https://images.dog.ceo/breeds/affenpinscher/n02110627_10149.jpg'
            ]
        },
        {
            name: 'african',
            id: 2,
            images: [
                'https://images.dog.ceo/breeds/african/n02110627_10147.jpg',
                'https://images.dog.ceo/breeds/african/n02110627_10148.jpg',
                'https://images.dog.ceo/breeds/african/n02110627_10149.jpg'
            ]
        },
        {
            name: 'airedale',
            id: 3,
            images: [
                'https://images.dog.ceo/breeds/airedale/n02110627_10147.jpg',
                'https://images.dog.ceo/breeds/airedale/n02110627_10148.jpg',
                'https://images.dog.ceo/breeds/airedale/n02110627_10149.jpg'
            ]
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
            dogList
        };
        expect(action.setDogList(dogList)).toEqual(dogListAction);
    });

    it('Should fetch dog list', () => {
        const apiResponse = JSON.stringify(dogList);

        const expectedAction = {
            type: types.SET_DOG_LIST,
            dogList: dogList
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
        const dogListString = JSON.stringify(dogList);
        localStorage.setItem(KEY, dogListString);
        expect(localStorage.__STORE__[KEY]).toEqual(dogListString);
        expect(action.getFromLocalStorage('dogList')).toEqual(dogList);
    });

    it('Should return falsy if dogList is not in Local Storage', () => {
        const KEY = 'dogList';
        expect(localStorage.__STORE__[KEY]).toBeFalsy();
        expect(action.getFromLocalStorage(KEY)).toBeFalsy();
    });
});
