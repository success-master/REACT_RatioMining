import { vehiclesTypes } from '../actions/types'

const initialState = {
    loading: false,
    vehicleList: [],
    totalVehicles: 0,
    error: null,
    newVehicle: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case vehiclesTypes.FETCH_VEHICLE_LIST_BEGIN:
            return { ...state, loading: true, error: null }
        case vehiclesTypes.FETCH_VEHICLE_LIST_END:
            return { ...state, loading: false, vehicleList: action.payload, totalVehicles: action.payload.length, error: null }

        case vehiclesTypes.CREATE_VEHICLE_BEGIN:
            return { ...state, loading: true, error: null }
        case vehiclesTypes.CREATE_VEHICLE_SUCCESS:
            return { ...state, loading: false, error: null, newVehicle: action.payload }
        case vehiclesTypes.CREATE_VEHICLE_FAILED:
            return { ...state, loading: false, error: 'Araç Oluşturulamadı!', newVehicle: null }

        case vehiclesTypes.RESET_VEHICLE:
            return { ...state, newVehicle: null, error: null }

        default:
            return state
    }
}
