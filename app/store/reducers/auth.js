import * as actions from '../actions/types'

const initialState = {
    authenticated: true,
    loading: false,
    error: null,
    token: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.LOGIN_START:
            return { ...initialState, authenticated: false, loading: true, error: null }
        case actions.LOGIN_SUCCESS:
            return {
                ...initialState,
                authenticated: true,
                loading: false,
                error: null,
                token: action.payload.token,
            }
        case actions.LOGIN_FAILED:
            return { ...initialState, authenticated: false, loading: false, error: 'Hatalı kullanıcı adı ya da şifre!' }
        default:
            return state
    }
}
