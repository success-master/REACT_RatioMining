const setMissionExcavator = (state, excavator) => {
    const newState = { ...state }

    newState.showExcavatorList = false
    newState.missions.forEach((mission, index) => {
        mission.excavator = excavator
        if (mission.target) {
            Object.keys(mission.target).forEach(key => {
                if (mission.target[key]) delete mission.target[key]
            })
        }
        if (!mission.excavator && !mission.trucks.length) mission.target = null
        if (index === 1 && !mission.trucks.length) mission.target = null
    })

    return newState
}

const setMissionLoadRegion = (state, region) => {
    const newState = { ...state }

    newState.showRegionList = false
    newState.missions.forEach(mission => {
        mission.loadRegion = region
    })
    return newState
}

const setMissionDumpRegion = (state, regions) => {
    const newState = { ...state }

    newState.showRegionList = false

    switch (regions.length) {
        case 0:
            newState.missions = [newState.missions[0]]
            newState.missions[0].dumpRegion = null
            break
        case 1:
            newState.missions = [newState.missions[0]]
            newState.missions[0].dumpRegion = regions[0]
            break
        case 2:
            newState.missions[0].dumpRegion = regions[0]
            if (newState.missions.length === 1) newState.missions.push({ ...newState.missions[0] })
            newState.missions[1].dumpRegion = regions[1]
            newState.missions[1].trucks = []
            break
        default:
            break
    }

    return newState
}

const setStockMissionRegion = (state, region) => {
    const newState = { ...state }

    newState.showRegionList = false
    newState.stockMission.loadRegion = region
    return newState
}

const appendTruck = (state, trucks) => {
    const newState = { ...state }

    newState.showTruckList = false
    newState.missions[state.activeIndex].trucks = [...newState.missions[state.activeIndex].trucks, ...trucks]
    return newState
}

const removeTruck = (state, id, index) => {
    const newState = { ...state }
    const newTrucks = newState.missions[index].trucks.filter(truck => truck.id !== id)

    state.missions[index].trucks = newTrucks
    delete newState.missions[index].target[id]
    if (!state.missions[index].excavator && !state.missions[index].trucks.length) state.missions[index].target = null
    if (index === 1 && !state.missions[index].trucks.length) state.missions[index].target = null

    return newState
}

const setTarget = (state, target) => {
    const newState = { ...state }

    newState.showTargetPopup = false

    if (state.activeTargetType === 'gem') {
        state.missions[newState.activeIndex].target = target
    } else {
        state.stockMission.target = target
    }

    return newState
}

const resetTarget = (state, index, type) => {
    const newState = { ...state }

    newState.showTargetPopup = false

    if (type === 'gem') {
        newState.missions[index].target = null
    } else {
        newState.stockMission.target = null
    }

    return newState
}

const setStockExcavator = (state, excavator) => {
    const newState = { ...state }

    newState.stockMission.excavator = excavator
    newState.showStockExcList = false

    return newState
}

const removeStockExcavator = state => {
    const newState = { ...state }

    newState.stockMission.excavator = null

    return newState
}

const setFromDraft = (state, data) => {
    const newState = { ...state }
    const mission = {}

    if (!data || !data.rows) return state

    newState.missions = []
    data.rows.forEach(row => {
        mission.excavator = row.vehicles.find(({ vehicleTypeId }) => vehicleTypeId === 2 || vehicleTypeId === 4 || vehicleTypeId === 5)
        mission.loadRegion = row.start
        mission.dumpRegion = row.end
        mission.trucks = row.vehicles.filter(({ vehicleTypeId }) => vehicleTypeId === 1)

        newState.missions.push(mission)
    })

    console.log(newState)
    return newState
}

const newTaskReducer = (state, action) => {
    switch (action.type) {
        case 'toggle_excavator_list':
            return {
                ...state,
                activeIndex: action.payload ? action.payload.index : 0,
                showExcavatorList: !state.showExcavatorList,
            }
        case 'toggle_region_list':
            return {
                ...state,
                activeIndex: action.payload ? action.payload.index : 0,
                showRegionList: !state.showRegionList,
                activeRegionType: action.payload ? action.payload.type : 'load',
            }
        case 'toggle_truck_list':
            return {
                ...state,
                activeIndex: action.payload ? action.payload.index : 0,
                showTruckList: !state.showTruckList,
            }
        case 'toggle_target_popup':
            return {
                ...state,
                activeIndex: action.payload ? action.payload.index : 0,
                showTargetPopup: !state.showTargetPopup,
                activeTargetType: action.payload ? action.payload.type : 'gem',
            }
        case 'toggle_summary_popup':
            return {
                ...state,
                showSummaryPopup: !state.showSummaryPopup,
                summaryType: action.payload ? action.payload.type : 'draft',
            }
        case 'toggle_draft_popup':
            return {
                ...state,
                showDraftPopup: !state.showDraftPopup,
            }
        case 'set_mission_excavator':
            return setMissionExcavator(state, action.payload.selected[0])
        case 'set_active_region_type':
            return {
                ...state,
                activeRegionType: action.payload.type,
            }
        case 'set_region':
            switch (state.activeRegionType) {
                case 'load':
                    return setMissionLoadRegion(state, action.payload.selected[0])
                case 'dump':
                    return setMissionDumpRegion(state, action.payload.selected)
                case 'stock':
                    return setStockMissionRegion(state, action.payload.selected[0])
                default:
                    return state
            }
        case 'append_truck':
            return appendTruck(state, action.payload.selected)
        case 'remove_truck':
            return removeTruck(state, action.payload.id, action.payload.index)
        case 'set_target':
            return setTarget(state, action.payload.target)
        case 'reset_target':
            return resetTarget(state, action.payload.index, action.payload.type)
        case 'toggle_from_stock':
            return {
                ...state,
                fromStock: !state.fromStock,
            }
        case 'set_stock_active':
            return {
                ...state,
                isStockActive: action.payload.active,
            }
        case 'toggle_stock_exc_list':
            return {
                ...state,
                showStockExcList: !state.showStockExcList,
            }
        case 'set_stock_excavator':
            return setStockExcavator(state, action.payload.selected[0])
        case 'remove_excavator_stock':
            return removeStockExcavator(state)
        case 'set_from_draft':
            return setFromDraft(state, action.payload.data)
        default:
            return state
    }
}

const initialState = {
    showExcavatorList: false,
    showRegionList: false,
    showTruckList: false,
    showTargetPopup: false,
    showSummaryPopup: false,
    showDraftPopup: false,
    summaryType: 'draft',
    activeIndex: 0,
    activeRegionType: 'load',
    activeTargetType: 'gem',
    fromStock: false,
    showStockExcList: false,
    isStockActive: false,
    missions: [
        {
            excavator: null,
            loadRegion: null,
            trucks: [],
            dumpRegion: null,
            target: null,
        },
    ],
    stockMission: {
        excavator: null,
        loadRegion: null,
        trucks: [],
        dumpRegion: null,
        target: null,
    },
}

export default newTaskReducer
export { initialState, setFromDraft }
