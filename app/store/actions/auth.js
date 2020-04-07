import * as types from './types'

export const initiateLogin = (username, password) => ({
    type: types.INITIATE_LOGIN,
    payload: { username, password },
})

export const loginStart = () => ({ type: types.LOGIN_START })

export const loginSuccess = (token, expiresIn) => ({ type: types.LOGIN_SUCCESS, payload: { token, expiresIn } })

export const loginFailed = () => ({ type: types.LOGIN_FAILED })
