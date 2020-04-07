import * as actions from '../actions/types'

const initialState = {
    notifications: [],
    loading: false,
    error: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_NOTIFICATIONS_BEGIN:
            return { ...state, loading: true, error: null }
        case actions.FETCH_NOTIFICATIONS_END:
            return { ...state, loading: false, notifications: action.payload.notifications, error: null }
        default:
            return state
    }
}
