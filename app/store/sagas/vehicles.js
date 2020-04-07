import { put } from 'redux-saga/effects'
import {
    fetchVehicleList,
    fetchVehicleListBegin,
    fetchVehicleListEnd,
    createVehicleBegin,
    createVehicleSuccess,
    createVehicleFailed,
} from '../actions'
import { apiEndpoint, getAccessToken } from '../../utils'

export function* fetchVehicleListSaga(action) {
    yield put(fetchVehicleListBegin())
    const typeFilter = action.payload

    const response = yield fetch(`${apiEndpoint}/vehicle?children=vehicle_type${typeFilter ? `&vehicleTypeId=${typeFilter}` : ''}`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    const vehicleList = yield response.json()
    yield put(fetchVehicleListEnd(vehicleList))
}

export function* createVehicleSaga(action) {
    const { vehicleConfig } = action.payload
    yield put(createVehicleBegin())
    const response = yield fetch(`${apiEndpoint}/vehicle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ratio-auth': getAccessToken(),
        },
        body: JSON.stringify(vehicleConfig),
    })
    const parsedResponse = yield response.json()

    if (parsedResponse.errors) yield put(createVehicleFailed())
    else yield put(createVehicleSuccess(parsedResponse))

    yield put(fetchVehicleList())
}
