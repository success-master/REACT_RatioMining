import { vehiclesTypes } from './types'

export const fetchVehicleList = typeFilter => ({ type: vehiclesTypes.FETCH_VEHICLE_LIST, payload: typeFilter })
export const fetchVehicleListBegin = () => ({ type: vehiclesTypes.FETCH_VEHICLE_LIST_BEGIN })
export const fetchVehicleListEnd = payload => ({ type: vehiclesTypes.FETCH_VEHICLE_LIST_END, payload })

export const createVehicle = vehicleConfig => ({ type: vehiclesTypes.CREATE_VEHICLE, payload: { vehicleConfig } })
export const createVehicleBegin = () => ({ type: vehiclesTypes.CREATE_VEHICLE_BEGIN })
export const createVehicleSuccess = newVehicle => ({ type: vehiclesTypes.CREATE_VEHICLE_SUCCESS, payload: newVehicle })
export const createVehicleFailed = () => ({ type: vehiclesTypes.CREATE_VEHICLE_FAILED })

export const resetVehicle = () => ({ type: vehiclesTypes.RESET_VEHICLE })
