import * as types from './types'

export const fetchTasks = () => ({ type: types.FETCH_TASKS })
export const fetchTasksBegin = () => ({ type: types.FETCH_TASKS_BEGIN })
export const fetchTasksEnd = tasks => ({ type: types.FETCH_TASKS_END, payload: { tasks } })

export const createNewTask = task => ({ type: types.CREATE_NEW_TASK, payload: { task } })
export const createNewTaskBegin = () => ({ type: types.CREATE_NEW_TASK_BEGIN })
export const createNewTaskSuccess = task => ({ type: types.CREATE_NEW_TASK_SUCCESS, payload: { task } })
export const createNewTaskFailed = () => ({ type: types.CREATE_NEW_TASK_FAILED })
export const createNewTaskInitialize = () => ({ type: types.CREATE_NEW_TASK_INITIALIZE })

export const pauseTask = id => ({ type: types.PAUSE_TASK, payload: { id } })
export const pauseTaskBegin = () => ({ type: types.PAUSE_TASK_BEGIN })
export const pauseTaskSuccess = id => ({ type: types.PAUSE_TASK_SUCCESS, payload: { id } })
export const pauseTaskInitialize = () => ({ type: types.PAUSE_TASK_INITIALIZE })

export const stopTask = id => ({ type: types.STOP_TASK, payload: { id } })
export const stopTaskBegin = () => ({ type: types.STOP_TASK_BEGIN })
export const stopTaskSuccess = id => ({ type: types.STOP_TASK_SUCCESS, payload: { id } })
export const stopTaskInitialize = () => ({ type: types.STOP_TASK_INITIALIZE })
