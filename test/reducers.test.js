import types from '../src/js/constants/action-types';
import rootReducer from '../src/js/reducers/';
import { mockStore } from '../tools/mockStore';

describe('Reducer Functions', () => {
    it('Should return state', () => {
        const iniState = {
            filterValue: '',
            dogList: [],
            dogListError: '',
            messagesList: []
        };
        expect(rootReducer()).toEqual(iniState);
    });

    it('Should return SetFilter action call to the store', () => {
        const filterAction = () => ({
            type: types.SET_DOG_FILTER,
            filter: 'Shibe'
        });
        const store = mockStore({ filter: '', dogs: [] });

        store.dispatch(filterAction());

        const actions = store.getActions();
        const expectedAction = {
            type: types.SET_DOG_FILTER,
            filter: 'Shibe'
        };
        expect(actions).toEqual([expectedAction]);
    });
});
