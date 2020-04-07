import { put } from 'redux-saga/effects'
import { loginStart, loginSuccess, loginFailed } from '../actions'
import { loginEndpoint } from '../../utils'

export default function* loginSaga(action) {
    // extract username and password from payload
    const { username, password } = action.payload

    // dispath login start action
    yield put(loginStart())

    // send request
    const response = yield fetch(loginEndpoint, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    })

    const json = yield response.json()
    console.log(json)

    // handle error
    if (json.error) return yield put(loginFailed())

    // save token to local storage
    localStorage.removeItem('token-ratio')
    localStorage.setItem('token-ratio', json.access_token)

    // dispatch login success action
    yield put(loginSuccess(json.access_token, json.expires_in))
}
