import React from 'react';
import {Provider} from 'react-redux';
import App from './components/App';
import configureStore from './store/ConfigureStore';

require('../sass/main.scss');

const store = configureStore();

React.render(
    <Provider store={store}>
        {() => <App />}
    </Provider>,
    document.getElementById('main')
);
