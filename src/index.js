import React from 'react';
import ReactDOM from 'react-dom';
import routes from './route';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import './css/index.css';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker'

function renderSurvey() {
    const initialState = window.initialReduxState
    const store = configureStore(browserHistory, initialState)
    const history = syncHistoryWithStore(browserHistory, store)

    const app = (
        <Provider store={store}>
            <Router history={history}>
                {routes}
            </Router>
        </Provider>
    )

    ReactDOM.render(app, document.getElementById('root'))
}
registerServiceWorker();
renderSurvey();
window.renderSurvey = renderSurvey
