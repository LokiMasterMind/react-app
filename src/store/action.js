import { CALL_API, HTTP_POST } from 'constants'

export class ApiActionTypes {
    constructor(name) {
        this.Request = `${name}_REQUEST`
        this.Success = `${name}_SUCCESS`
        this.Failure = `${name}_FAILURE`
        this.ActionTypes = [this.Request, this.Success, this.Failure]
    }
}

export const fetchData = new ApiActionTypes('FETCH_DATA')

export const getDataFromUrl = ({ id }) => ({
    [CALL_API]: {
        types: fetchData.ActionTypes,
        request: {
            url: `/api/welcome/${id}`
        }
    }
})
