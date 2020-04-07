/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
// import GoogleMap from 'google-map-react'
import { CSSTransition } from 'react-transition-group'
import { Button } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Done, Close } from '@material-ui/icons'
import { toast, Zoom, Flip } from 'react-toastify'
import GoogleMap from './GoogleMap'
import gMapReducer, { initialState } from '../hooks/gMapReducer'
import GoogleMapStyles from './styles/GoogleMapStyles'
import MapStyles, { AnimationStylesBackdrop, Backdrop, ActionOptionsStyles } from './styles/MapStyles'
import { StyledFab } from '../material-ui'
import { createDrawingManager, attachOverlayUpdateEvents } from '../api/map'
import NewRegion from './NewRegion'
import NewRoad from './NewRoad'
import DateTimeInterval from './DateTimeInterval'
import Popup from '../hoc/Popup'
import Spinner from './Spinner'
import withLayout from '../hoc/withLayout'
import 'react-toastify/dist/ReactToastify.min.css'
import {Event} from './Event'
import {
    fetchViolations,
    createRegion,
    createRoad,
    createRegionInitialize,
    createRoadInitialize,
    getLocationHistory,
    clearLocationHistory,
    fetchRegions,
    fetchRoads,
} from '../store/actions'

// Actions component - action buttons displayed above the map
const Actions = ({ onSelect }) => (
    <div className="action-container">
        <Button variant="contained" endIcon={<Icon>send</Icon>} onClick={() => onSelect('create-road')}>
            Yeni yol inşa Et
        </Button>
        <Button variant="contained" endIcon={<Icon>history</Icon>} onClick={() => onSelect('location-history')}>
            Geçmiş konumları göster
        </Button>
        {/* <Button variant="contained" endIcon={<Icon>speed</Icon>} onClick={() => onSelect('')}>
            Yol hız dağılımları
        </Button> */}
        <Button variant="contained" endIcon={<Icon>room</Icon>} onClick={() => onSelect('create-region')}>
            Görev bölgesi oluştur
        </Button>
    </div>
)

Actions.propTypes = {
    onSelect: PropTypes.func.isRequired,
}

// Action Options component
const ActionOptions = ({ approveDrawing, cancelDrawing }) => (
    <ActionOptionsStyles>
        <StyledFab size="small" variant="extended" color="primary" aria-label="onayla" onClick={approveDrawing}>
            <Done style={{ marginRight: '10px' }} />
            Onayla
        </StyledFab>
        <StyledFab size="small" variant="extended" color="secondary" aria-label="iptal" onClick={cancelDrawing}>
            <Close style={{ marginRight: '10px' }} />
            İptal
        </StyledFab>
    </ActionOptionsStyles>
)

ActionOptions.propTypes = {
    approveDrawing: PropTypes.func.isRequired,
    cancelDrawing: PropTypes.func.isRequired,
}

// handle update drawing manager
const updateDrawingManager = (gmapState, gmapDispatch, selectedAction) => {
    const { map, maps, drawingManager } = gmapState

    if (drawingManager) drawingManager.setMap(null)

    gmapDispatch({ type: 'set_is_drawing', payload: { drawing: false } })

    const manager = createDrawingManager(maps)
    manager.setDrawingMode(selectedAction === 'create-road' ? 'polyline' : 'polygon')
    manager.setMap(map)

    // attach overlay complete event listener to drawing manager
    const overlayType = selectedAction === 'create-road' ? 'road' : 'area'
    maps.event.addListener(manager, 'overlaycomplete', event => {
        manager.setMap(null) // scrap drawing manager, we are finished with it
        attachOverlayUpdateEvents(event, maps, gmapDispatch) // attach update events to created overlay
        gmapDispatch({ type: 'set_drawn_overlay', payload: { type: overlayType, overlay: event.overlay } }) // set overlay on gmap state
    })

    gmapDispatch({ type: 'set_drawing_manager', payload: { manager } })
}

// Map component
const Map = () => {
    const [gmapState, gmapDispatch] = React.useReducer(gMapReducer, initialState) // gmap reducer for UI state
    const { loading, error, regions, roads, newRegion, newRoad, vehicleLog } = useSelector(state => state.map) // destruct redux state
    const dispatch = useDispatch() // dispatch function for redux
    const {
        map,
        maps,
        area,
        road,
        heatmap,
        selectedAction,
        drawingManager,
        isDrawing,
        showNewRegionPopup,
        showNewRoadPopup,
        showDateInterval,
    } = gmapState // destruct gmap state

    // escape key press handler
    const handleKeyUpEvent = React.useCallback(
        e => {
            switch (e.keyCode) {
                case 13: // enter
                    if (selectedAction === 'create-road' && isDrawing) drawingManager.setDrawingMode(null)
                    break
                case 27: // escape
                    if (isDrawing) updateDrawingManager(gmapState, gmapDispatch, selectedAction)
                    else handleAbortAction()
                    break
                default:
                    break
            }
        },
        [drawingManager, isDrawing, selectedAction]
    )

    // fetch regions and roads
    React.useEffect(() => {
        if (!regions.length) dispatch(fetchRegions())
        if (!roads.length) dispatch(fetchRoads())
    }, [])

    // attach event listener for escape key press
    React.useEffect(() => {
        window.addEventListener('keyup', handleKeyUpEvent)
        return () => window.removeEventListener('keyup', handleKeyUpEvent)
    }, [drawingManager, isDrawing, selectedAction])

    // handle fetch rule violations
    React.useEffect(() => {
        if (selectedAction === 'geofencing') dispatch(fetchViolations())
    }, [selectedAction])

    // display helper instructions for drawing polyline
    const displayDrawingInstructionsForRoad = () => {
        if (!road && !isDrawing && !toast.isActive('helper'))
            toast('Çıkmak için ESC tuşuna basın', {
                toastId: 'helper',
                autoClose: false,
                closeButton: false,
                className: 'toast-inner',
            })

        if (!road && !isDrawing && toast.isActive('helper'))
            toast.update('helper', { render: 'Çıkmak için ESC tuşuna basın', transition: Flip })
        if (!road && isDrawing)
            toast.update('helper', { render: 'Sonlandırmak için ENTER, iptal etmek için ESC tuşuna basın', transition: Zoom })
        if (road)
            toast.update('helper', {
                render: (
                    <ActionOptions
                        approveDrawing={() => gmapDispatch({ type: 'approve_road_drawing' })}
                        cancelDrawing={handleAbortAction}
                    />
                ),
                toastId: 'helper',
                className: 'toast-inner-gray',
                closeButton: false,
                transition: Flip,
            })
    }

    const refetchShapes = () => {
        dispatch(fetchRegions())
        dispatch(fetchRoads())
    }

    // display helper instructions for drawing polygon
    const displayDrawingInstructionsForArea = () => {
        if (!area)
            toast('Çıkmak için ESC tuşuna basın', {
                toastId: 'helper',
                autoClose: false,
                closeButton: false,
                className: 'toast-inner',
            })

        if (area)
            toast.update('helper', {
                render: (
                    <ActionOptions
                        approveDrawing={() => gmapDispatch({ type: 'approve_area_drawing' })}
                        cancelDrawing={handleAbortAction}
                    />
                ),
                toastId: 'helper',
                className: 'toast-inner-gray',
                closeButton: false,
                transition: Flip,
            })
    }

    // display instructions if necessarry
    React.useEffect(() => {
        switch (selectedAction) {
            case 'create-road':
                displayDrawingInstructionsForRoad()
                break
            case 'create-region':
                displayDrawingInstructionsForArea()
                break
            default:
                toast.dismiss('helper')
                break
        }
    }, [selectedAction, isDrawing, area, road])

    // display location history
    React.useEffect(() => {
        if (vehicleLog.length > 0) {
            const heatmap = new maps.visualization.HeatmapLayer({
                data: vehicleLog.map(({ loc }) => new maps.LatLng(loc.coordinates[1], loc.coordinates[0])),
            })
            heatmap.setMap(map)
            gmapDispatch({ type: 'set_heatmap_layer', payload: { heatmap } })
        } else {
            if (heatmap) heatmap.setMap(null)
            gmapDispatch({ type: 'clear_heatmap_layer' })
        }
    }, [vehicleLog])

    // set selected action
    const actionSelected = selectedAction => {
        gmapDispatch({ type: 'set_selected_action', payload: { selectedAction } })

        // initialize drawing manager if necessarry
        if (selectedAction === 'create-road' || selectedAction === 'create-region')
            updateDrawingManager(gmapState, gmapDispatch, selectedAction)

        // toggle date interval pop up if necessarry
        if (selectedAction === 'location-history') gmapDispatch({ type: 'toggle_date_interval' })
    }

    // handle API loaded event of gmap
    const handleMapsApiLoaded = (map, maps) => {
        gmapDispatch({ type: 'google_api_loaded', payload: { map, maps } })
    }

    // handle abort current action
    const handleAbortAction = () => {
        if (drawingManager) drawingManager.setMap(null) // scrap drawing manager
        if (area) area.setMap(null) // remove drawn area if there is any
        if (road) road.setMap(null) // remove drawn road if there is any
        if (heatmap) heatmap.setMap(null) // remove heatmap if htere is any
        if (vehicleLog.length > 0) dispatch(clearLocationHistory()) // clear location history if it is present
        gmapDispatch({ type: 'abort_current_action' }) // update gmap state
    }

    const handleClickOnMap = () => {
        if (!isDrawing && (selectedAction === 'create-road' || selectedAction === 'create-region')) {
            gmapDispatch({ type: 'set_is_drawing', payload: { drawing: true } })
        }
    }

    const refreshEvent = new Event();

    return (
        <MapStyles>
            {/* action container at the top */}
            <Actions onSelect={actionSelected} />
            {/* map */}
            <GoogleMapStyles>
                <GoogleMap
                    regions={regions}
                    roads={roads}
                    editable
                    clicked={handleClickOnMap}
                    refetch={refetchShapes}
                    refreshEvent={refreshEvent}
                    onMapLoaded={({ map, maps }) => handleMapsApiLoaded(map, maps)}
                />
            </GoogleMapStyles>
            {/* backdrop */}
            <AnimationStylesBackdrop show={selectedAction !== ''}>
                <CSSTransition in={selectedAction !== ''} timeout={200} classNames="backdrop" unmountOnExit>
                    <Backdrop onClick={handleAbortAction} />
                </CSSTransition>
            </AnimationStylesBackdrop>
            {/* new region popup */}
            <Popup
                show={showNewRegionPopup}
                title="Görev bölgesi oluştur"
                onClose={() => {
                    gmapDispatch({ type: 'abort_create_new_region' })
                    handleAbortAction()
                    if (newRegion) {
                        handleAbortAction()
                        dispatch(createRegionInitialize())
                    }
                }}
            >
                <NewRegion onSubmit={data => {dispatch(createRegion({ ...data, area }));refreshEvent.call("refresh");}} newRegion={newRegion} error={error} />
            </Popup>
            {/* new road popup */}
            <Popup
                show={showNewRoadPopup}
                title="Yeni yol oluştur"
                onClose={() => {
                    gmapDispatch({ type: 'abort_create_new_road' })
                    handleAbortAction()
                    if (newRoad) {
                        handleAbortAction()
                        dispatch(createRoadInitialize())
                    }
                }}
            >
                <NewRoad onSubmit={data => {dispatch(createRoad({ ...data, road }));refreshEvent.call("refresh");}} newRoad={newRoad} error={error} />
            </Popup>
            {/* location history date interval selection popup */}
            <Popup show={showDateInterval && !vehicleLog.length} title="Tarih / Saat Aralığı Seçin" onClose={handleAbortAction}>
                <DateTimeInterval
                    error={error}
                    onSubmit={values => {
                        dispatch(getLocationHistory(values))
                    }}
                />
            </Popup>
            {/* spinner */}
            {(loading || !map) && <Spinner />}
        </MapStyles>
    )
}

export default withLayout(Map)
