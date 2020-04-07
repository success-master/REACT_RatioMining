import { put } from 'redux-saga/effects'
import {
    fetchPersonnelList,
    fetchPersonnelListBegin,
    fetchPersonnelListEnd,
    createPersonnelBegin,
    createPersonnelSuccess,
    createPersonnelFailed,
} from '../actions'
import { apiEndpoint, getAccessToken } from '../../utils'

export function* fetchPersonnelListSaga() {
    yield put(fetchPersonnelListBegin())
    const response = yield fetch(`${apiEndpoint}/staff?children=staff_type|shift_type`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    const personnelList = yield response.json()
    yield put(fetchPersonnelListEnd(personnelList))
}

export function* createPersonnelSaga(action) {
    const { personnelConfig } = action.payload
    yield put(createPersonnelBegin())
    const response = yield fetch(`${apiEndpoint}/staff`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ratio-auth': getAccessToken(),
        },
        body: JSON.stringify(personnelConfig),
    })
    const parsedResponse = yield response.json()

    if (parsedResponse.errors) yield put(createPersonnelFailed())
    else yield put(createPersonnelSuccess(parsedResponse))

    yield put(fetchPersonnelList())
}
