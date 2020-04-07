const newGemOpReducer = (state, action) => {
    switch (action.type) {
        case 'set_operation_name':
            return {
                ...state,
                operationName: action.payload.operationName,
            }
        case 'set_active_load':
            return {
                ...state,
                activeLoad: action.payload.activeLoad,
            }
        case 'operation_type_selected':
            return {
                ...state,
                activeStep: 1,
                operationType: action.payload.type,
            }
        case 'set_active_step':
            return {
                ...state,
                activeStep: action.payload.index,
            }
        case 'toggle_excavator_list':
            return {
                ...state,
                showExcavatorList: !state.showExcavatorList,
            }
        case 'toggle_truck_list':
            return {
                ...state,
                showTruckList: !state.showTruckList,
            }
        case 'toggle_loader_list':
            return {
                ...state,
                showLoaderList: !state.showLoaderList,
            }
        case 'set_excavators':
            return {
                ...state,
                showExcavatorList: false,
                excavators: [...action.payload.selected],
            }
        case 'set_loaders':
            return {
                ...state,
                showLoaderList: false,
                loaders: [...action.payload.selected],
            }
        case 'set_trucks':
            return {
                ...state,
                showTruckList: false,
                trucks: [...action.payload.selected],
            }
        case 'remove_excavator':
            return {
                ...state,
                excavators: state.excavators.filter(v => v.id !== action.payload.id),
            }
        case 'remove_truck':
            return {
                ...state,
                trucks: state.trucks.filter(v => v.id !== action.payload.id),
            }
        case 'remove_loader':
            return {
                ...state,
                loaders: state.loaders.filter(v => v.id !== action.payload.id),
            }
        case 'set_region_load':
            return {
                ...state,
                regionLoad: action.payload.region,
            }
        case 'set_region_dump':
            return {
                ...state,
                regionDump: action.payload.region,
            }
        case 'set_active_tab':
            return {
                ...state,
                activeTab: action.payload.tab,
            }
        case 'toggle_loading':
            return {
                ...state,
                loading: !state.loading,
            }
        case 'set_charts':
            return {
                ...state,
                charts: action.payload.charts,
            }
        case 'set_page':
            return {
                ...state,
                page: action.payload.page,
            }
        case 'set_total_work_time':
            return {
                ...state,
                totalWorkTime: action.payload.totalWorkTime,
            }
        case 'set_target_bunker':
            return {
                ...state,
                targetBunker: action.payload.targetBunker,
            }
        case 'lock_bunker':
            return {
                ...state,
                lockBunker: action.payload.lockBunker,
            }
        default:
            return state
    }
}

const initialState = {
    operationName: '',
    loading: false,
    activeLoad: null,
    activeTab: 'opt',
    activeStep: 0,
    operationType: '',
    totalWorkTime: null,
    showExcavatorList: false,
    showLoaderList: false,
    showTruckList: false,
    excavators: [],
    trucks: [],
    loaders: [],
    regionLoad: [],
    regionDump: null,
    targetBunker: null,
    lockBunker: false,
    charts: [],
    page: 0,
}

export default newGemOpReducer
export { initialState }
