import * as types from './types'

export const fetchPersonnel = () => ({ type: types.FETCH_PERSONNEL })
export const fetchPersonnelBegin = () => ({ type: types.FETCH_PERSONNEL_BEGIN })
export const fetchPersonnelEnd = personnel => ({ type: types.FETCH_PERSONNEL_END, payload: { personnel } })

export const fetchVehicles = () => ({ type: types.FETCH_VEHICLES })
export const fetchVehiclesBegin = () => ({ type: types.FETCH_VEHICLES_BEGIN })
export const fetchVehiclesEnd = vehicles => ({ type: types.FETCH_VEHICLES_END, payload: { vehicles } })

export const fetchRegions = () => ({ type: types.FETCH_REGIONS })
export const fetchRegionsBegin = () => ({ type: types.FETCH_REGIONS_BEGIN })
export const fetchRegionsEnd = regions => ({ type: types.FETCH_REGIONS_END, payload: { regions } })

export const fetchRoads = () => ({ type: types.FETCH_ROADS })
export const fetchRoadsBegin = () => ({ type: types.FETCH_ROADS_BEGIN })
export const fetchRoadsEnd = roads => ({ type: types.FETCH_ROADS_END, payload: { roads } })

export const fetchViolations = () => ({ type: types.FETCH_VIOLATIONS })
export const fetchViolationsBegin = () => ({ type: types.FETCH_VIOLATIONS_BEGIN })
export const fetchViolationsEnd = violations => ({ type: types.FETCH_VIOLATIONS_END, payload: { violations } })

export const createRegion = data => ({ type: types.CREATE_REGION, payload: data })
export const createRegionBegin = () => ({ type: types.CREATE_REGION_BEGIN })
export const createRegionSuccess = region => ({ type: types.CREATE_REGION_SUCCESS, payload: { region } })
export const createRegionFailed = () => ({ type: types.CREATE_REGION_FAILED })
export const createRegionInitialize = () => ({ type: types.CREATE_REGION_INITIALIZE })

export const updateShape = data => ({ type: types.UPDATE_SHAPE, payload: data })
export const updateShapeBegin = () => ({ type: types.UPDATE_SHAPE_BEGIN })
export const updateShapeSuccess = shape => ({ type: types.UPDATE_SHAPE_SUCCESS, payload: { shape } })
export const updateShapeFailed = () => ({ type: types.UPDATE_SHAPE_FAILED })
export const updateShapeInitialize = () => ({ type: types.UPDATE_SHAPE_INITIALIZE })

export const deleteShape = data => ({ type: types.DELETE_SHAPE, payload: data })
export const deleteShapeBegin = () => ({ type: types.DELETE_SHAPE_BEGIN })
export const deleteShapeSuccess = shape => ({ type: types.DELETE_SHAPE_SUCCESS, payload: { shape } })
export const deleteShapeFailed = () => ({ type: types.DELETE_SHAPE_FAILED })
export const deleteShapeInitialize = () => ({ type: types.DELETE_SHAPE_INITIALIZE })

export const createRoad = data => ({ type: types.CREATE_ROAD, payload: data })
export const createRoadBegin = () => ({ type: types.CREATE_ROAD_BEGIN })
export const createRoadSuccess = road => ({ type: types.CREATE_ROAD_SUCCESS, payload: { road } })
export const createRoadFailed = () => ({ type: types.CREATE_ROAD_FAILED })
export const createRoadInitialize = () => ({ type: types.CREATE_ROAD_INITIALIZE })

export const getLocationHistory = values => ({ type: types.GET_LOCATION_HISTORY, payload: { values } })
export const getLocationHistoryBegin = () => ({ type: types.GET_LOCATION_HISTORY_BEGIN })
export const getLocationHistorySuccess = logs => ({ type: types.GET_LOCATION_HISTORY_SUCCESS, payload: { logs } })
export const getLocationHistoryFailed = error => ({ type: types.GET_LOCATION_HISTORY_FAILED, payload: { error } })
export const clearLocationHistory = () => ({ type: types.CLEAR_LOCATION_HISTORY })
