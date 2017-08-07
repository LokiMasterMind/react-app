import get from 'lodash/get'

export const selectData = state => get(state, 'data', [])
export const selectLoading = state => get(state, 'loading', false)
