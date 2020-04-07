import { personnelTypes } from './types'

export const fetchPersonnelList = () => ({ type: personnelTypes.FETCH_PERSONNEL_LIST })
export const fetchPersonnelListBegin = () => ({ type: personnelTypes.FETCH_PERSONNEL_LIST_BEGIN })
export const fetchPersonnelListEnd = payload => ({ type: personnelTypes.FETCH_PERSONNEL_LIST_END, payload })

export const createPersonnel = personnelConfig => ({ type: personnelTypes.CREATE_PERSONNEL, payload: { personnelConfig } })
export const createPersonnelBegin = () => ({ type: personnelTypes.CREATE_PERSONNEL_BEGIN })
export const createPersonnelSuccess = newPersonnel => ({ type: personnelTypes.CREATE_PERSONNEL_SUCCESS, payload: newPersonnel })
export const createPersonnelFailed = () => ({ type: personnelTypes.CREATE_PERSONNEL_FAILED })

export const resetPersonnel = () => ({ type: personnelTypes.RESET_PERSONNEL })
