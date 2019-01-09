import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/';

export default function configStore(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
