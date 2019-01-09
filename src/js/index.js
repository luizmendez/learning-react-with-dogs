import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/app.css';

import { Provider } from 'react-redux';
import configStore from './store';

import App from './components/App';

const rootElement = document.getElementById('root');
const store = configStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
