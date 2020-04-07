import * as types from './types'

export const fetchStaffTypes = () => ({ type: types.FETCH_STAFF_TYPES })
export const fetchStaffTypesBegin = () => ({ type: types.FETCH_STAFF_TYPES_BEGIN })
export const fetchStaffTypesSuccess = data => ({ type: types.FETCH_STAFF_TYPES_SUCCESS, payload: { data } })
