import { personnelTypes } from '../actions/types'

const initialState = {
    loading: false,
    personnelList: [],
    totalPersonnels: 0,
    error: null,
    newPersonnel: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case personnelTypes.FETCH_PERSONNEL_LIST_BEGIN:
            return { ...state, loading: true, error: null }
        case personnelTypes.FETCH_PERSONNEL_LIST_END:
            return { ...state, loading: false, personnelList: action.payload, totalPersonnels: action.payload.length, error: null }

        case personnelTypes.CREATE_PERSONNEL_BEGIN:
            return { ...state, loading: true, error: null }
        case personnelTypes.CREATE_PERSONNEL_SUCCESS:
            return { ...state, loading: false, error: null, newPersonnel: action.payload }
        case personnelTypes.CREATE_PERSONNEL_FAILED:
            return { ...state, loading: false, newPersonnel: null, error: 'Personel Oluşturulamadı!' }

        case personnelTypes.RESET_PERSONNEL:
            return { ...state, error: null, newPersonnel: null }

        default:
            return state
    }
}
