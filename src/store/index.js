import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import api from './api'
import rootReducer from './reducer'

export default function configureStore(history, initialState) {
    const middleware = [thunk, api, routerMiddleware(history)]
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware),
    )
    return store
}
