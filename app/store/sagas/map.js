import { put } from 'redux-saga/effects'
import { apiEndpoint, getAccessToken } from '../../utils'
import { getPathArray } from '../../api/map'

import {
    fetchPersonnelBegin,
    fetchPersonnelEnd,
    fetchVehiclesBegin,
    fetchVehiclesEnd,
    fetchRegionsBegin,
    fetchRegionsEnd,
    fetchRoadsBegin,
    fetchRoadsEnd,
    fetchViolationsEnd,
    createRegionBegin,
    createRegionSuccess,
    createRegionFailed,
    createRoadBegin,
    createRoadSuccess,
    createRoadFailed,
    updateShapeBegin,
    updateShapeSuccess,
    updateShapeFailed,
    deleteShapeBegin,
    deleteShapeSuccess,
    deleteShapeFailed,
    getLocationHistoryBegin,
    getLocationHistorySuccess,
} from '../actions'
export function* fetchPersonnelSaga() {
    yield put(fetchPersonnelBegin())
    const response = yield fetch(`${apiEndpoint}/stafflog`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    const collection = yield response.json()
    yield put(fetchPersonnelEnd(collection))
}

export function* fetchVehiclesSaga() {
    yield put(fetchVehiclesBegin())
    const response = yield fetch(`${apiEndpoint}/vehiclelog`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    const collection = yield response.json()
    yield put(fetchVehiclesEnd(collection))
}

export function* saveRegionSaga(action) {
    yield put(createRegionBegin())
    action.payload.properties = action.payload.properties || {};
    const payload = {
        name: action.payload.name,
        type: action.payload.type,
        properties: JSON.stringify(action.payload.properties),
        loc: {
            type: 'Polygon',
            coordinates: [getPathArray(action.payload.area).map(({ lat, lng }) => [lng, lat])],
        },
        regionTypeId: action.payload.regionTypeId
    }

    const response = yield fetch(`${apiEndpoint}/region`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ratio-auth': getAccessToken(),
        },
        body: JSON.stringify(payload),
    })

    const data = yield response.json()

    if (response.status === 201) yield put(createRegionSuccess({ name: data.name }))
    else yield put(createRegionFailed())
}

export function* saveRoadSaga(action) {
    yield put(createRoadBegin())

    const points = getPathArray(action.payload.road).map(({ lat, lng }) => [lng, lat])
    action.payload.properties = action.payload.properties || {};
    const payload = {
        name: action.payload.name,
        road: {
            type: 'LineString',
            coordinates: points,
        },
        properties: JSON.stringify(action.payload.properties),
        maxSpeed: action.payload.maxSpeed
    }

    const response = yield fetch(`${apiEndpoint}/route`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ratio-auth': getAccessToken(),
        },
        body: JSON.stringify(payload),
    })

    const data = yield response.json()

    if (response.status === 201) yield put(createRoadSuccess({ name: data.name }))
    else yield put(createRoadFailed())
}

export function* getLocationHistorySaga(action) {
    const { dateBegin, timeBegin, dateEnd, timeEnd } = action.payload.values
    const start = new Date(dateBegin.getFullYear(), dateBegin.getMonth(), dateBegin.getDate(), timeBegin.getHours(), timeBegin.getMinutes())
    const end = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), timeEnd.getHours(), timeEnd.getMinutes())

    yield put(getLocationHistoryBegin())

    const response = yield fetch(`${apiEndpoint}/vehicleLog?createdBegin=${start}&createdEnd=${end}`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    const collection = yield response.json()

    yield put(getLocationHistorySuccess(collection))
}

export function* fetchRegionsSaga() {
    yield put(fetchRegionsBegin())
    const response = yield fetch(`${apiEndpoint}/region`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    const collection = yield response.json()
    collection.forEach(c=>{
        if(typeof c.properties == "string")
            c.properties = JSON.parse(c.properties);
    });
    yield put(fetchRegionsEnd(collection))
}

export function* fetchRoadsSaga() {
    yield put(fetchRoadsBegin())
    const response = yield fetch(`${apiEndpoint}/route`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    const collection = yield response.json()
    collection.forEach(c=>{
        if(typeof c.properties == "string")
            c.properties = JSON.parse(c.properties);
    });
    yield put(fetchRoadsEnd(collection))
}

export function* fetchViolationsSaga() {
    yield put(fetchVehiclesBegin())
    const response = yield fetch(`${apiEndpoint}/ruleviolation`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    const collection = yield response.json()
    yield put(fetchViolationsEnd(collection))
}

export function* updateShapeSaga(action) {
    const { shape, name, properties, record, regionTypeId, maxSpeed } = action.payload

    yield put(updateShapeBegin())

    const endpoint = record.road ? 'route' : 'region'
    const coordinates = getPathArray(shape).map(({ lat, lng }) => [lng, lat])

    const payload =
        endpoint === 'route'
            ? { road: JSON.stringify({ ...record.road, coordinates: coordinates }), name, properties, maxSpeed }
            : { loc: { ...record.loc, coordinates: [coordinates] }, name, properties, regionTypeId }

    const response = yield fetch(`${apiEndpoint}/${endpoint}/${record.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'ratio-auth': getAccessToken(),
        },
        body: JSON.stringify(payload),
    });

    const data = yield response.json()

    if (response.status === 200 || response.status === 204) yield put(updateShapeSuccess({ name: data.name }))
    else yield put(updateShapeFailed())
}

export function* deleteShapeSaga(action) {
    const { endpoint, record } = action.payload

    yield put(deleteShapeBegin())

    const response = yield fetch(`${apiEndpoint}/${endpoint}/${record.id}`, {
        method: 'DELETE',
        headers: { 'ratio-auth': getAccessToken() },
    })

    if (response.status === 200 || response.status === 204) yield put(deleteShapeSuccess({ name: record.name }))
    else yield put(deleteShapeFailed())
}
