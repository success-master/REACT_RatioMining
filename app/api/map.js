import { teal, lightBlue } from '@material-ui/core/colors'

// create drawing manager
export const createDrawingManager = maps => {
    return new maps.drawing.DrawingManager({
        drawingControl: false,
        polygonOptions: {
            draggable: false,
            editable: true,
            fillColor: lightBlue[600],
            fillOpacity: 0.4,
            strokeColor: lightBlue[600],
            strokeOpacity: 1,
        },
        polylineOptions: {
            draggable: false,
            editable: true,
            strokeColor: teal[600],
            strokeOpacity: 1,
        },
    })
}

export const handleApiLoaded = map => {
    // disable default UI buttons and set cursor
    map.setOptions({ disableDefaultUI: true, draggableCursor: 'default' })

    // set map style
    map.setMapTypeId('hybrid')
}

// extract path array from overlay object
export const getPathArray = object =>
    object
        .getPath()
        .getArray()
        .map(point => ({ lat: point.lat(), lng: point.lng() }))

// find center of polygon
export const getPolygonCenter = polygon => {
    const coordinates = getPathArray(polygon)
    const lat = coordinates.reduce((a, b) => a + b.lat, 0) / coordinates.length
    const lng = coordinates.reduce((a, b) => a + b.lng, 0) / coordinates.length
    return { lat, lng }
}

// calculate zoom
export const calculateZoom = polygon => {
    const coordinates = getPathArray(polygon)
    const minLat = Math.min(...coordinates.map(({ lat }) => lat))
    const maxLat = Math.max(...coordinates.map(({ lat }) => lat))
    const zoom = Math.round(Math.log((300 * 360) / (maxLat - minLat) / 256) / Math.LN2) - 2
    return zoom < 15 ? zoom : 15
}

// attach change events for polygon
export const attachOverlayUpdateEvents = (event, maps, gmapDispatch) => {
    const { type, overlay } = event
    overlay[type === 'polyline' ? 'getPath' : 'getPaths']()
        .getArray()
        .forEach(path => {
            maps.event.addListener(path, 'insert_at', () => {
                gmapDispatch({ type: type === 'polyline' ? 'set_drawn_road' : 'set_drawn_area', payload: { overlay: event.overlay } })
            })
            maps.event.addListener(path, 'remove_at', () => {
                gmapDispatch({ type: type === 'polyline' ? 'set_drawn_road' : 'set_drawn_area', payload: { overlay: event.overlay } })
            })
            maps.event.addListener(path, 'set_at', () => {
                gmapDispatch({ type: type === 'polyline' ? 'set_drawn_road' : 'set_drawn_area', payload: { overlay: event.overlay } })
            })
        })
}
