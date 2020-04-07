import * as actions from '../actions/types'

const initialState = {
    loading: false,
    error: null,
    newTask: null,
    pausedTask: null,
    stoppedTask: null,
    currentTasks: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_TASKS_BEGIN:
            return { ...initialState, loading: true, objects: [], error: null }
        case actions.FETCH_TASKS_END:
            return { ...initialState, loading: false, currentTasks: action.payload.tasks, error: null }
        case actions.CREATE_NEW_TASK_BEGIN:
            return { ...initialState, loading: true, newTask: null, error: null }
        case actions.CREATE_NEW_TASK_SUCCESS:
            return { ...initialState, loading: false, newTask: action.payload.task, error: null }
        case actions.CREATE_NEW_TASK_FAILED:
            return { ...initialState, loading: false, newTask: null, error: 'Something went wrong!' }
        case actions.CREATE_NEW_TASK_INITIALIZE:
            return { ...initialState, loading: false, newTask: null, error: null }
        case actions.PAUSE_TASK_BEGIN:
            return { ...initialState, loading: true, pausedTask: null, error: null }
        case actions.PAUSE_TASK_SUCCESS:
            return { ...initialState, loading: false, pausedTask: action.payload.id, error: null }
        case actions.PAUSE_TASK_INITIALIZE:
            return { ...initialState, loading: false, pausedTask: null, error: null }
        case actions.STOP_TASK_BEGIN:
            return { ...initialState, loading: true, stoppedTask: null, error: null }
        case actions.STOP_TASK_SUCCESS:
            return { ...initialState, loading: false, stoppedTask: action.payload.id, error: null }
        case actions.STOP_TASK_INITIALIZE:
            return { ...initialState, loading: false, stoppedTask: null, error: null }
        default:
            return state
    }
}
