import { fetchData } from './action'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export const getData = (state = {}, action) => {
    switch (action.type) {
    case fetchData.Request:
        return {
            ...state,
            data: action.payload.data,
            loading: true
        }
    case fetchData.Success:
        return {
            ...state,
            data: action.payload.data,
            loading: false
        }
    case fetchData.Failure:
        return {
            ...state,
            data: [],
            error: action.payload.error,
            loading: true
        }
    default:
        return state
    }
}

export default combineReducers({
    getData,
    routing: routerReducer
})
