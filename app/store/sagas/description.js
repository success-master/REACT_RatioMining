import { put } from 'redux-saga/effects'
import { fetchStaffTypesBegin, fetchStaffTypesSuccess } from '../actions'
import { apiEndpoint } from '../../utils'

export default function* descriptionSaga(action) {
    yield put(fetchStaffTypesBegin())

    const response = yield fetch(`${apiEndpoint}/stafftype`)
    const data = yield response.json()

    yield put(fetchStaffTypesSuccess(data))
}
