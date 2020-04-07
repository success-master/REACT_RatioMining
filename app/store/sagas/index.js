import { takeEvery } from 'redux-saga/effects'
import loginSaga from './auth'
import { fetchTasksSaga, createNewTaskSaga, pauseTaskSaga, stopTaskSaga } from './tasks'
import { fetchVehicleListSaga, createVehicleSaga } from './vehicles'
import { fetchPersonnelListSaga, createPersonnelSaga } from './personnels'
import { fetchNotificationsSaga } from './notification'
import fetchDescriptionSaga from './description'
import * as actions from '../actions/types'
import {
    fetchPersonnelSaga,
    fetchVehiclesSaga,
    fetchRegionsSaga,
    fetchRoadsSaga,
    fetchViolationsSaga,
    saveRegionSaga,
    saveRoadSaga,
    getLocationHistorySaga,
    updateShapeSaga,
    deleteShapeSaga,
} from './map'

export function* watchAuth() {
    yield takeEvery(actions.INITIATE_LOGIN, loginSaga)
}

export function* watchMap() {
    yield takeEvery(actions.FETCH_PERSONNEL, fetchPersonnelSaga)
    yield takeEvery(actions.FETCH_VEHICLES, fetchVehiclesSaga)
    yield takeEvery(actions.FETCH_REGIONS, fetchRegionsSaga)
    yield takeEvery(actions.FETCH_ROADS, fetchRoadsSaga)
    yield takeEvery(actions.FETCH_VIOLATIONS, fetchViolationsSaga)
    yield takeEvery(actions.CREATE_REGION, saveRegionSaga)
    yield takeEvery(actions.CREATE_ROAD, saveRoadSaga)
    yield takeEvery(actions.GET_LOCATION_HISTORY, getLocationHistorySaga)
    yield takeEvery(actions.UPDATE_SHAPE, updateShapeSaga)
    yield takeEvery(actions.DELETE_SHAPE, deleteShapeSaga)
}

export function* watchTasks() {
    yield takeEvery(actions.FETCH_TASKS, fetchTasksSaga)
    yield takeEvery(actions.CREATE_NEW_TASK, createNewTaskSaga)
    yield takeEvery(actions.PAUSE_TASK, pauseTaskSaga)
    yield takeEvery(actions.STOP_TASK, stopTaskSaga)
}

export function* watchVehicles() {
    yield takeEvery(actions.vehiclesTypes.FETCH_VEHICLE_LIST, fetchVehicleListSaga)
    yield takeEvery(actions.vehiclesTypes.CREATE_VEHICLE, createVehicleSaga)
}

export function* watchPersonnels() {
    yield takeEvery(actions.personnelTypes.FETCH_PERSONNEL_LIST, fetchPersonnelListSaga)
    yield takeEvery(actions.personnelTypes.CREATE_PERSONNEL, createPersonnelSaga)
}

export function* watchNotifications() {
    yield takeEvery(actions.FETCH_NOTIFICATIONS, fetchNotificationsSaga)
}

export function* watchDescriptions() {
    yield takeEvery(actions.FETCH_STAFF_TYPES, fetchDescriptionSaga)
}
