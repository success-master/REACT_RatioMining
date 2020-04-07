const gMapReducer = (state, action) => {
    switch (action.type) {
        case 'google_api_loaded':
            // save references for map objects
            return {
                ...state,
                map: action.payload.map,
                maps: action.payload.maps,
            }
        case 'set_drawing_manager':
            return {
                ...state,
                drawingManager: action.payload.manager,
            }
        case 'set_selected_action':
            return {
                ...state,
                selectedAction: action.payload.selectedAction,
                isDrawing: false,
            }
        case 'set_is_drawing':
            return {
                ...state,
                isDrawing: action.payload.drawing,
            }
        case 'set_drawn_overlay':
            return {
                ...state,
                [action.payload.type]: action.payload.overlay,
                isDrawing: false,
            }
        case 'approve_area_drawing':
            return {
                ...state,
                showNewRegionPopup: true,
            }
        case 'approve_road_drawing':
            return {
                ...state,
                showNewRoadPopup: true,
            }
        case 'abort_create_new_region':
            return {
                ...state,
                showNewRegionPopup: false,
            }
        case 'abort_create_new_road':
            return {
                ...state,
                showNewRoadPopup: false,
            }
        case 'toggle_date_interval':
            return {
                ...state,
                showDateInterval: !state.showDateInterval,
            }
        case 'set_heatmap_layer':
            return {
                ...state,
                heatmap: action.payload.heatmap,
            }
        case 'clear_heatmap_layer':
            return {
                ...state,
                heatmap: null,
            }
        case 'abort_current_action':
            return {
                ...state,
                drawingManager: null,
                selectedAction: '',
                area: null,
                road: null,
                isDrawing: false,
                heatmap: null,
                showNewRegionPopup: false,
                showNewRoadPopup: false,
                showDateInterval: false,
            }
        default:
            return state
    }
}

const initialState = {
    map: null,
    maps: null,
    drawingManager: null,
    selectedAction: '',
    area: null,
    road: null,
    isDrawing: false,
    showNewRegionPopup: false,
    showNewRoadPopup: false,
    showDateInterval: false,
}

export default gMapReducer
export { initialState }
