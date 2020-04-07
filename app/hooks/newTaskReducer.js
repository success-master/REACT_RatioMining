const filterTarget = (state, ids) => {
    let newTarget = { ...state.target }
    ids.forEach(id => {
        delete newTarget[id]
    })
    if (Object.keys(newTarget).length <= 1) newTarget = null
    return newTarget
}

const addRegion = (state, regions, type) => {
    switch (type) {
        case 'load':
            return { ...state, showRegionPopup: false, loadRegions: regions }
        case 'dump':
            return { ...state, showRegionPopup: false, dumpRegions: regions }
        case 'stock':
            return { ...state, showRegionPopup: false, stockRegions: regions }
        default:
            return state
    }
}

const newTaskReducer = (state, action) => {
    switch (action.type) {
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
        case 'toggle_stock_exc_list':
            return {
                ...state,
                showStockExcList: !state.showStockExcList,
            }
        case 'toggle_target_popup':
            return {
                ...state,
                showTargetPopup: !state.showTargetPopup,
                targetType: action.payload ? action.payload.type : 'gem',
            }
        case 'toggle_region_popup':
            return {
                ...state,
                showRegionPopup: !state.showRegionPopup,
                regionType: action.payload ? action.payload.type : 'load',
            }
        case 'toggle_summary_popup':
            return {
                ...state,
                showSummaryPopup: !state.showSummaryPopup,
                summaryType: action.payload ? action.payload.type : 'draft',
            }
        case 'add_region':
            return addRegion(state, action.payload.regions, action.payload.type)
        case 'remove_load_region':
            return {
                ...state,
                loadRegions: [],
            }
        case 'remove_dump_region':
            return {
                ...state,
                dumpRegions: [],
            }
        case 'append_excavator':
            return {
                ...state,
                showExcavatorList: false,
                excavators: action.payload.selected,
            }
        case 'append_truck':
            return {
                ...state,
                showTruckList: false,
                trucks: [...state.trucks, ...action.payload.selected],
            }
        case 'append_stock_exc':
            return {
                ...state,
                showStockExcList: false,
                excavatorsStock: [...state.excavatorsStock, ...action.payload.selected],
            }
        case 'set_target':
            return {
                ...state,
                showTargetPopup: false,
                [state.targetType === 'gem' ? 'target' : 'targetStock']: action.payload.target,
            }
        case 'reset_target':
            return {
                ...state,
                showTargetPopup: false,
                [action.payload.type === 'gem' ? 'target' : 'targetStock']: null,
            }
        case 'remove_target_entries':
            return {
                ...state,
                target: filterTarget(state, action.payload.ids),
            }
        case 'remove_excavator':
            return {
                ...state,
                excavators: [],
            }
        case 'remove_truck':
            return {
                ...state,
                trucks: state.trucks.filter(v => v.id !== action.payload.id),
            }
        case 'toggle_from_stock':
            return {
                ...state,
                fromStock: !state.fromStock,
            }
        case 'remove_stock_region':
            return {
                ...state,
                stockRegions: [],
            }
        case 'remove_excavator_stock':
            return {
                ...state,
                excavatorsStock: [],
            }
        default:
            return state
    }
}

const initialState = {
    showExcavatorList: false,
    showTruckList: false,
    showTargetPopup: false,
    showRegionPopup: false,
    showSummaryPopup: false,
    regionType: 'load',
    summaryType: 'draft',
    loadRegions: [],
    dumpRegions: [],
    excavators: [],
    trucks: [],
    target: null,
    fromStock: false,
    stockRegions: [],
    excavatorsStock: [],
    showStockExcList: false,
    targetStock: null,
    targetType: 'gem',
}

export default newTaskReducer
export { initialState }
