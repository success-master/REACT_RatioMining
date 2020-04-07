import { put } from 'redux-saga/effects'
import { apiEndpoint, getAccessToken } from '../../utils'
import { fetchNotificationsBegin, fetchNotificationsEnd } from '../actions'

export function* fetchNotificationsSaga() {
    yield put(fetchNotificationsBegin())
    const responses = yield Promise.all([
        fetch(`${apiEndpoint}/notificationOperation?sort=-createdAt&offset=0&count=10`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        }),
        fetch(`${apiEndpoint}/notificationMission?sort=-createdAt&offset=0&count=10`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        }),
        fetch(`${apiEndpoint}/notificationVehicle?sort=-createdAt&offset=0&count=10`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        }),
        fetch(`${apiEndpoint}/notificationStaff?sort=-createdAt&offset=0&count=10`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        }),
    ])
    let [operationNotifs, missionNotifs, vehicleNotifs, staffNotifs] = yield Promise.all([
        responses[0].json(),
        responses[1].json(),
        responses[2].json(),
        responses[3].json(),
    ])

    operationNotifs = operationNotifs.map(notif => ({ ...notif, type: 'operation' }))
    missionNotifs = missionNotifs.map(notif => ({ ...notif, type: 'mission' }))
    vehicleNotifs = vehicleNotifs.map(notif => ({ ...notif, type: 'vehicle' }))
    staffNotifs = staffNotifs.map(notif => ({ ...notif, type: 'staff' }))

    const collection = [...operationNotifs, ...missionNotifs, ...vehicleNotifs, ...staffNotifs]
    collection.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : b.updatedAt > a.updatedAt ? 1 : 0))

    yield put(fetchNotificationsEnd(collection))
}
