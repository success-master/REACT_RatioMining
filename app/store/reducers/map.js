import * as actions from '../actions/types'

const initialState = {
    loading: false,
    personnel: [],
    vehicles: [],
    regions: [],
    roads: [],
    violations: [],
    vehicleLog: [],
    fetchingPersonnel: false,
    fetchingVehicles: false,
    newRegion: null,
    newRoad: null,
    updatedShape: null,
    deletedShape: null,
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.FETCH_PERSONNEL_BEGIN:
            return { ...state, loading: true, fetchingPersonnel: true, error: '' }
        case actions.FETCH_PERSONNEL_END:
            return { ...state, loading: false, fetchingPersonnel: false, personnel: action.payload.personnel, error: '' }
        case actions.FETCH_VEHICLES_BEGIN:
            return { ...state, loading: true, fetchingVehicles: true, error: '' }
        case actions.FETCH_VEHICLES_END:
            return { ...state, loading: false, fetchingVehicles: false, vehicles: action.payload.vehicles, error: '' }
        case actions.FETCH_REGIONS_BEGIN:
            return { ...state, loading: true, regions: [], error: '' }
        case actions.FETCH_REGIONS_END:
            return { ...state, loading: false, regions: action.payload.regions, error: '' }
        case actions.FETCH_ROADS_BEGIN:
            return { ...state, loading: true, roads: [], error: '' }
        case actions.FETCH_ROADS_END:
            return { ...state, loading: false, roads: action.payload.roads, error: '' }
        case actions.FETCH_VIOLATIONS_BEGIN:
            return { ...state, loading: true, violations: [], error: '' }
        case actions.FETCH_VIOLATIONS_END:
            return { ...state, loading: false, violations: action.payload.violations, error: '' }
        case actions.CREATE_REGION_BEGIN:
            return { ...state, loading: true, newRegion: null, error: '' }
        case actions.CREATE_REGION_SUCCESS:
            return { ...state, loading: false, newRegion: action.payload.region, error: '' }
        case actions.CREATE_REGION_FAILED:
            return { ...state, loading: false, newRegion: null, error: 'Something went wrong!' }
        case actions.CREATE_REGION_INITIALIZE:
            return { ...state, loading: false, newRegion: null, error: '' }
        case actions.CREATE_ROAD_BEGIN:
            return { ...state, loading: true, newRoad: null, error: '' }
        case actions.CREATE_ROAD_SUCCESS:
            return { ...state, loading: false, newRoad: action.payload.road, error: '' }
        case actions.CREATE_ROAD_FAILED:
            return { ...state, loading: false, newRoad: null, error: 'Something went wrong!' }
        case actions.CREATE_ROAD_INITIALIZE:
            return { ...state, loading: false, newRoad: null, error: '' }
        case actions.GET_LOCATION_HISTORY_BEGIN:
            return { ...state, loading: true, vehicleLog: [], error: '' }
        case actions.GET_LOCATION_HISTORY_SUCCESS:
            return { ...state, loading: false, vehicleLog: action.payload.logs, error: '' }
        case actions.GET_LOCATION_HISTORY_FAILED:
            return { ...state, loading: false, vehicleLog: [], error: 'Something went wrong!' }
        case actions.CLEAR_LOCATION_HISTORY:
            return { ...state, vehicleLog: [], error: '' }
        case actions.UPDATE_SHAPE_BEGIN:
            return { ...state, loading: true, updatedShape: null, error: '' }
        case actions.UPDATE_SHAPE_SUCCESS:
            return { ...state, loading: false, updatedShape: action.payload.shape, error: '' }
        case actions.UPDATE_SHAPE_FAILED:
            return { ...state, loading: false, updatedShape: null, error: 'Something went wrong!' }
        case actions.UPDATE_SHAPE_INITIALIZE:
            return { ...state, loading: false, updatedShape: null, error: '' }
        case actions.DELETE_SHAPE_BEGIN:
            return { ...state, loading: true, deletedShape: null, error: '' }
        case actions.DELETE_SHAPE_SUCCESS:
            return { ...state, loading: false, deletedShape: action.payload.shape, error: '' }
        case actions.DELETE_SHAPE_FAILED:
            return { ...state, loading: false, deletedShape: null, error: 'Something went wrong!' }
        case actions.DELETE_SHAPE_INITIALIZE:
            return { ...state, loading: false, deletedShape: null, error: '' }
        default:
            return state
    }
}
