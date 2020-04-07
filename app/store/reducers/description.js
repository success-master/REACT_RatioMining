import * as actions from '../actions/types'

const initialState = {
    staffTypes: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_STAFF_TYPES_BEGIN:
            return { ...initialState, staffTypes: [] }
        case actions.FETCH_STAFF_TYPES_SUCCESS:
            return { ...initialState, staffTypes: action.payload.data }
        default:
            return state
    }
}
