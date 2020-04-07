import { put } from 'redux-saga/effects'
import random from 'random-int'
import {
    fetchTasksBegin,
    fetchTasksEnd,
    createNewTaskBegin,
    createNewTaskSuccess,
    createNewTaskFailed,
    pauseTaskBegin,
    pauseTaskSuccess,
    stopTaskBegin,
    stopTaskSuccess,
} from '../actions'
import { apiEndpoint, getAccessToken } from '../../utils'

export function* fetchTasksSaga() {
    yield put(fetchTasksBegin())
    const response = yield fetch(`${apiEndpoint}/operation?sort=-createdAt`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    const collection = yield response.json()
    yield put(fetchTasksEnd(collection))
}

export function* createNewTaskSaga(action) {
    const { task } = action.payload

    yield put(createNewTaskBegin())

    const payloadOperation = {
        description: task.name,
        type: task.type,
        status: task.summaryType === 'draft' ? 0 : 1,
        active: true,
    }

    const responseOperation = yield fetch(`${apiEndpoint}/operation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ratio-auth': getAccessToken(),
        },
        body: JSON.stringify(payloadOperation),
    })

    const dataOperation = yield responseOperation.json()

    if (responseOperation.status !== 201) {
        yield put(createNewTaskFailed())
        return
    }

    const missionData = []

    task.missions.forEach(mission => {
        missionData.push({
            id: random(9999),
            status: 1,
            targetLoad: mission.target[mission.excavator.id],
            currentRound: 0,
            vehicleId: mission.excavator.id,
            operationId: dataOperation.id,
            startRegionId: mission.loadRegion.id,
            endRegionId: mission.dumpRegion.id,

            startdate: Date.now(),
            enddate: Date.now(),
            expectedEnddate: null,
            task: task.name,
            type: 'a tipi',
            totalLoad: 0,
            currentLoad: 0,
            calculatedRound: 0,
            state: 1,
            prevState: 0,
            history: JSON.stringify({}),
            extra: JSON.stringify({ ratio: 0.0 }),
        })
        mission.trucks.forEach(truck => {
            missionData.push({
                id: random(9999),
                status: 1,
                targetLoad: mission.target[truck.id],
                currentRound: 0,
                vehicleId: truck.id,
                operationId: dataOperation.id,
                startRegionId: mission.loadRegion.id,
                endRegionId: mission.dumpRegion.id,

                startdate: Date.now(),
                enddate: Date.now(),
                expectedEnddate: null,
                task: task.name,
                type: 'a tipi',
                totalLoad: 0,
                currentLoad: 0,
                calculatedRound: 0,
                state: 1,
                prevState: 0,
                history: JSON.stringify({}),
                extra: JSON.stringify({ ratio: 0.0 }),
            })
        })
    })

    const missionRequests = missionData.map(payload =>
        fetch(`${apiEndpoint}/mission`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ratio-auth': getAccessToken(),
            },
            body: JSON.stringify(payload),
        })
    )

    yield Promise.all(missionRequests)
    yield put(createNewTaskSuccess({ name: task.name }))
}

export function* pauseTaskSaga(action) {
    const { id } = action.payload
    yield put(pauseTaskBegin())
    const response = yield fetch(`${apiEndpoint}/operationStatus/${id}/2`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ratio-auth': getAccessToken(),
        },
    })
    // const data = yield response.json()
    yield put(pauseTaskSuccess(id))
}

export function* stopTaskSaga(action) {
    const { id } = action.payload
    yield put(stopTaskBegin())
    const response = yield fetch(`${apiEndpoint}/operationStatus/${id}/3`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ratio-auth': getAccessToken(),
        },
    })
    // const data = yield response.json()
    yield put(stopTaskSuccess(id))
}
