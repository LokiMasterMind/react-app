import axios from 'axios'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import { CALL_API } from './constants'

const UNKNOWN_ERROR = 'Unknown Error'

function callApi(requestConfig) {
    return axios(requestConfig)
        .then(response => {
            if (response.data && response.data.entity) {
                return response.data
            } else if (response.data) {
                return response.data
            } else {
                return Promise.reject({ code: -1 })
            }
        })
        .catch(error => {
            const { status, data, statusText } = error.response
            if (status === 404 || status === 401) {
                return Promise.reject(data.error.message === null
                    ? ' ' : data.error.message || `Error | ${UNKNOWN_ERROR}`)
            } else if (status === 400) {
                return Promise.reject(data || error || UNKNOWN_ERROR)
            } else if (status === 500) {
                return Promise.reject(statusText || error || UNKNOWN_ERROR)
            } else {
                return Promise.reject(data.error.message || error || UNKNOWN_ERROR)
            }
        })
}

export default () => next => action => {
    const apiRequest = action[CALL_API]
    if (typeof apiRequest === 'undefined') {
        return next(action)
    }

    const { types, request } = apiRequest

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }

    if (!isObject(request)) {
        throw new Error('Expected an object API request configuration.')
    }

    if (!types.every(isString)) {
        throw new Error('Expected action types to be strings.')
    }

    function actionWith(data) {
        const finalAction = { ...request, ...data }
        delete finalAction[CALL_API]
        return finalAction
    }

    const [requestType, successType, failureType] = types

    next(actionWith({ type: requestType, ...action }))

    // Headers for IE
    request.headers = request.headers || {}
    request.headers = {
        ...request.headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0
    }

    return callApi(request)
        .then(response => {
            if (response.redirectPath) {
                return Promise.reject({ redirectPath: response.redirectPath })
            } else {
                const nextAction = actionWith({
                    payload: response,
                    type: successType,
                    ...action
                })
                next(nextAction)
                return Promise.resolve(nextAction)
            }
        })
        .catch(error => {
            next(actionWith({
                type: failureType,
                error: error.message || error || UNKNOWN_ERROR
            }))
            return Promise.reject(error)
        })
}
