import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { regionTypes, fetchData } from '../utils'
import { MenuItem } from '@material-ui/core'
import { teal } from '@material-ui/core/colors'
import { fade } from '@material-ui/core/styles'
import { toast, Slide, Flip } from 'react-toastify'
import { Done, DeleteOutline } from '@material-ui/icons'
import MapObject from './MapObject'
import { ActionOptionsStyles } from './styles/MapStyles'
import { StyledInput, StyledFab,StyledCheckbox } from '../material-ui'
import { handleApiLoaded } from '../api/map'
import { getRegionColor } from '../api/home'
import { defaultCenter, defaultZoom } from '../utils'
import { updateShape, updateShapeInitialize, deleteShape, deleteShapeInitialize } from '../store/actions'
import 'react-toastify/dist/ReactToastify.min.css'

const styles = {
    width: 'fit-content',
    minWidth: '120px',
    textAlign: 'center',
    color: 'rgb(33, 33, 33)',
    background: 'rgba(245, 245, 245, 0.8)',
}


// Action Options component
const ActionOptions = ({ onUpdateShape, onDeleteShape, selectedObject }) => {
    selectedObject.properties = selectedObject.properties || {};
    const [selected, setSelected] = React.useState(selectedObject);
    const [staffTypes,setStaffTypes] = React.useState([]);
    const [vehicles,setVehicles] = React.useState([]);
    function handleChange(e){
        var name = e.target.name.split(".");
        if(name.length>1){
            var child = Object.assign({},selected[name[0]],{[name[1]]:e.target.value});
            setSelected(Object.assign({},selected,{[name[0]]:child}));
        }else{
            setSelected(Object.assign({},selected,{[e.target.name]: e.target.value}));
        }
        return;
    }

    function checkboxChangeHandler(propName){
        return e=>{
            var id = Number(e.target.name);
            setSelected(prev=>{
                var temp = Object.assign({},prev);
                temp.properties[propName] = temp.properties[propName] || [];
                if(temp.properties.allowedstafftypes.some(a=>a==id))
                    temp.properties[propName] = temp.properties[propName].filter(a=>a!=id);
                else
                    temp.properties[propName].push(id);
                temp.properties[propName] = temp.properties[propName].sort((a,b)=>a-b);
                return temp;
            });
        }
    }

    React.useEffect(()=>{
        fetchData("/stafftype?sort=id").then(setStaffTypes);
        fetchData("/vehicle?sort=id").then(setVehicles);
    },[]);

    React.useEffect(()=>{
        setSelected(selectedObject);
    },[selectedObject]);

    return (
        <div style={{ padding: '10px' }}>
            <StyledInput
                name="name"
                label="Ad"
                value={selected.name || ''}
                onChange={handleChange.bind(this)}
                margin="dense"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '10px' }}
            />
            {selected.road && 
            <StyledInput
                name="maxSpeed"
                label="Hız limiti (km/sa)"
                value={selected.maxSpeed || ''}
                onChange={handleChange.bind(this)}
                margin="dense"
                variant="outlined"
                fullWidth
                style={{ marginBottom: '10px' }}
            />}
            {selected.regionTypeId && <StyledInput
                fullWidth
                select
                name="regionTypeId"
                label="Bölge tipi"
                margin="dense"
                variant="outlined"
                value={selected.regionTypeId ? selected.regionTypeId : 1}
                onChange={handleChange.bind(this)}>
                    {regionTypes.map(({ key, value }) => <MenuItem key={key} value={key}>
                        {value}
                    </MenuItem>)}
            </StyledInput>}
            {selected.regionTypeId==1 && (
                <>
                    <StyledInput
                        name="properties.gemRatio"
                        label="Cevher Oranı"
                        value={selected.properties.gemRatio}
                        onChange={handleChange.bind(this)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '10px' }}
                    />
                </>
            )}
            {selected.regionTypeId==2 &&(
                <>
                    <StyledInput
                        name="properties.stock"
                        label="Mevcut stok miktarı (T)"
                        value={selected.properties.stock || ''}
                        onChange={handleChange.bind(this)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '10px' }}
                    />
                    <StyledInput
                        name="properties.estimatedStockGemRatio"
                        label="Tahmini stok cevher oranı"
                        value={selected.properties.estimatedStockGemRatio || ''}
                        onChange={handleChange.bind(this)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '10px' }}
                    />
                </>
            )}
            {selected.regionTypeId==5 &&(
                <>
                    <StyledInput
                        name="properties.eta"
                        label="Tahmini işlem süresi (saniye/ton)"
                        value={selected.properties.eta || ''}
                        onChange={handleChange.bind(this)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '10px' }}
                    />
                    <StyledInput
                        name="properties.capacity"
                        label="Toplam kapasite (T)"
                        value={selected.properties.capacity || ''}
                        onChange={handleChange.bind(this)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '10px' }}
                    />
                    <StyledInput
                        fullWidth
                        name="properties.load"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        label="Mevcut yük miktarı (T)"
                        margin="dense"
                        variant="outlined"
                        value={selected.properties.load || ''}
                        onChange={handleChange.bind(this)}
                    />
                    <StyledInput
                        fullWidth
                        name="properties.estimatedGemRatio"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        label="Tahmini cevher oranı (%)"
                        margin="dense"
                        variant="outlined"
                        value={selected.properties.estimatedGemRatio || ''}
                        onChange={handleChange.bind(this)}
                    />
                </>
            )}
            <div>
                <label
                style={{color:"#000"}}
                >İzin verilen personel türleri</label>
                {staffTypes.map(s=>(
                    <div>
                        <StyledCheckbox
                        margin="dense"
                        variant="outlined"
                        onChange={checkboxChangeHandler("allowedstafftypes")}
                        name={`${s.id}`}
                        checked={selected.properties.allowedstafftypes && selected.properties.allowedstafftypes.some(a=>a==s.id)}
                        /> {s.name}
                    </div>
                ))}
                
            </div>
            <div>
                <label
                style={{color:"#000"}}
                >İzin verilen araçlar</label>
                {vehicles.map(s=>(
                    <div>
                        <StyledCheckbox
                        margin="dense"
                        variant="outlined"
                        onChange={checkboxChangeHandler("allowedvehicles")}
                        name={`${s.id}`}
                        checked={selected.properties.allowedvehicles && selected.properties.allowedvehicles.some(a=>a==s.id)}
                        /> {`${(s.manufacturer || '')} ${(('('+s.plate+')') || '')}`}
                    </div>
                ))}
                
            </div>
            
            <ActionOptionsStyles>
                <StyledFab size="small" variant="extended" color="primary" aria-label="onayla" onClick={() => onUpdateShape(selected)}>
                    <Done style={{ marginRight: '10px' }} />
                    Sakla
                </StyledFab>
                <StyledFab size="small" variant="extended" color="secondary" aria-label="sil" onClick={onDeleteShape}>
                    <DeleteOutline style={{ marginRight: '10px' }} />
                    Sil
                </StyledFab>
            </ActionOptionsStyles>
        </div>
    )
}

ActionOptions.propTypes = {
    onUpdateShape: PropTypes.func.isRequired,
    onDeleteShape: PropTypes.func.isRequired,
    selectedObject: PropTypes.object.isRequired
}

const GoogleMap = ({ personnel, vehicles, regions, roads, onClickObject, onMapLoaded, clicked, editable, refetch, refreshEvent }) => {
    const [mapState, setMapState] = React.useState({ map: null, maps: null })
    const [hoveredRegion, setHoveredRegion] = React.useState(null)
    const [hoveredRoad, setHoveredRoad] = React.useState(null)
    const [selectedShape, setSelectedShape] = React.useState(null)
    const [shapeList, setShapeList] = React.useState([])
    const { updatedShape, deletedShape } = useSelector(state => state.map)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (!mapState.map || !regions.length) return
        
        const listOfRegions = regions
            .filter(({ loc }) => loc.type === 'Polygon' && loc.coordinates[0])
            .map(
                ({ id, loc, regionTypeId }) =>
                    new mapState.maps.Polygon({
                        paths: loc.coordinates[0].map(([lng, lat]) => ({ lat, lng })),
                        strokeColor: getRegionColor(regionTypeId),
                        fillColor: fade(getRegionColor(regionTypeId), 0.4),
                        strokeWeight: 2,
                        indexID: id,
                        customInfo: id.toString(),
                    })
            )

        // eslint-disable-next-line
        listOfRegions.forEach(shape => attachSpaheEvents(shape, 'region'))
    }, [mapState.map, regions])

    React.useEffect(() => {
        if (!mapState.map || !roads.length) return

        const listOfRoads = roads
            .filter(({ road }) => road !== null)
            .map(
                ({ id, road }) =>
                    new mapState.maps.Polyline({
                        path: road.coordinates.map(([lng, lat]) => ({ lat, lng })),
                        strokeColor: teal[100],
                        strokeWeight: 3,
                        indexID: id,
                    })
            )

        // eslint-disable-next-line
        listOfRoads.forEach(shape => attachSpaheEvents(shape, 'road'))
    }, [mapState.map, roads])

    const handleRefresh = () => {
        if(selectedShape)
            selectedShape.setEditable(false)
        setSelectedShape(null)
        shapeList.forEach(shape => shape.setMap(null))
        setShapeList([])
        refetch()
    }

    if(refreshEvent){
        refreshEvent.on("refresh",handleRefresh);
    }

    React.useEffect(() => {
        shapeList.forEach(shape => shape.setEditable(false))
        
        if (selectedShape !== null) {
            const selected = selectedShape.fillColor
                ? regions.find(region => region.id === selectedShape.indexID)
                : roads.find(road => road.id === selectedShape.indexID)

            selectedShape.setEditable(true);
            
            toast('',{toastId: 'actions'});
            toast.update('actions', {
                render: <ActionOptions onUpdateShape={handleUpdateShape} onDeleteShape={handleDeleteShape} selectedObject={selected} />,
                className: 'toast-inner-gray',
                autoClose: false,
                closeOnClick: false,
                position: toast.POSITION.BOTTOM_RIGHT,
                transition: Slide,
                draggable: false,
                onClose: () => {
                    refreshEvent.call("refresh");
                },
            });
            
        } else {
            toast.dismiss('actions');
        }
    }, [selectedShape]);

    React.useEffect(() => {
        if (updatedShape) {
            toast.update('actions', {
                type: toast.TYPE.SUCCESS,
                render: `${updatedShape.name} güncellendi`,
                autoClose: 1500,
                closeOnClick: true,
                position: toast.POSITION.BOTTOM_RIGHT,
                transition: Flip,
                onClose: () => {
                    dispatch(updateShapeInitialize())
                    refreshEvent.call("refresh");
                },
            })
        }
    }, [updatedShape])

    React.useEffect(() => {
        if (deletedShape) {
            toast.update('actions', {
                type: toast.TYPE.SUCCESS,
                render: `${deletedShape.name} silindi`,
                autoClose: 1500,
                closeOnClick: true,
                position: toast.POSITION.BOTTOM_RIGHT,
                transition: Flip,
                onClose: () => {
                    dispatch(deleteShapeInitialize())
                    refreshEvent.call("refresh");
                },
            })
        }
    }, [deletedShape])

   
    const attachSpaheEvents = (shape, type) => {
        if(shapeList.find(s=>s.indexID==shape.indexID))
            return;
        shape.setMap(mapState.map)

        mapState.maps.event.addListener(shape, 'mouseover', () =>
            type === 'region' ? setHoveredRegion(shape.indexID) : setHoveredRoad(shape.indexID)
        )
        mapState.maps.event.addListener(shape, 'mouseout', () => (type === 'region' ? setHoveredRegion(null) : setHoveredRoad(null)))

        if (editable)
            mapState.maps.event.addListener(shape, 'click', function() {
                setSelectedShape(this)
            })

        setShapeList(prevList => [...prevList, shape])
    }

    const handleUpdateShape = selected => {
        dispatch(
            updateShape({
                shape: selectedShape,
                name:selected.name,
                properties:selected.properties ? JSON.stringify(selected.properties) : "{}",
                record: selectedShape.fillColor
                    ? regions.find(region => region.id === selectedShape.indexID)
                    : roads.find(road => road.id === selectedShape.indexID),
                road: selected.road,
                maxSpeed: Number(selected.maxSpeed),
                regionTypeId: selected.regionTypeId
            })
        )
    }

    const handleDeleteShape = () => {
        dispatch(
            deleteShape({
                endpoint: selectedShape.fillColor ? 'region' : 'route',
                record: selectedShape.fillColor
                    ? regions.find(region => region.id === selectedShape.indexID)
                    : roads.find(road => road.id === selectedShape.indexID),
            })
        )
    }

    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: 'AIzaSyAXPja1j9Bh3bfw4041F7K_f2vkGsV39c0',
                libraries: 'drawing',
            }}
            defaultCenter={defaultCenter}
            defaultZoom={defaultZoom}
            onClick={clicked}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {
                handleApiLoaded(map)
                setMapState({ map, maps })
                onMapLoaded({ map, maps })
            }}
        >
            {personnel.map(({ id, staffId, loc }) => (
                <MapObject
                    key={`${id}p`}
                    id={staffId}
                    type="personnel"
                    lat={loc.coordinates[1]}
                    lng={loc.coordinates[0]}
                    clicked={onClickObject}
                />
            ))}
            {vehicles.filter(({loc})=>loc).map(({ id, vehicleId, loc }) => (
                <MapObject
                    key={`${id}v`}
                    id={vehicleId}
                    type="truck"
                    lat={loc.coordinates[1]}
                    lng={loc.coordinates[0]}
                    clicked={onClickObject}
                />
            ))}
            {hoveredRegion && (regions.find(region => region.id === hoveredRegion) != undefined) && (
                <div
                    className="MuiTooltip-tooltip"
                    lat={regions.find(region => region.id === hoveredRegion).loc.coordinates[0][0][1]}
                    lng={regions.find(region => region.id === hoveredRegion).loc.coordinates[0][0][0]}
                    style={styles}
                >
                    {regions.find(region => region.id === hoveredRegion).name}
                </div>
            )}
            {hoveredRoad && (regions.find(region => region.id === hoveredRegion) != undefined) && (
                <div
                    className="MuiTooltip-tooltip"
                    lat={roads.find(road => road.id === hoveredRoad).road.coordinates[1][1]}
                    lng={roads.find(road => road.id === hoveredRoad).road.coordinates[1][0]}
                    style={styles}
                >
                    {roads.find(road => road.id === hoveredRoad).name}
                </div>
            )}
        </GoogleMapReact>
    )
}

GoogleMap.propTypes = {
    personnel: PropTypes.arrayOf(PropTypes.object),
    vehicles: PropTypes.arrayOf(PropTypes.object),
    regions: PropTypes.arrayOf(PropTypes.object),
    roads: PropTypes.arrayOf(PropTypes.object),
    onClickObject: PropTypes.func,
    onMapLoaded: PropTypes.func,
    refetch: PropTypes.func,
    clicked: PropTypes.func,
    editable: PropTypes.bool,
    refreshEvent: PropTypes.object
}

GoogleMap.defaultProps = {
    personnel: [],
    vehicles: [],
    regions: [],
    roads: [],
    onClickObject: () => {},
    onMapLoaded: () => {},
    clicked: () => {},
    refetch: () => {},
    editable: false,
    refreshEvent: null
}

export default React.memo(GoogleMap)
