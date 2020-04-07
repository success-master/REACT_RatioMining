import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import GoogleMap from 'google-map-react'
import { List, ListItemText, Divider } from '@material-ui/core'
import { grey, lightBlue } from '@material-ui/core/colors'
import { makeStyles, fade } from '@material-ui/core/styles'
import { StyledButton, StyledListItem } from '../material-ui'
import { handleApiLoaded, getPolygonCenter, calculateZoom } from '../api/map'
import { apiEndpoint, defaultCenter, defaultZoom, getAccessToken } from '../utils'

const RegionSelectionStyles = styled.div`
    display: flex;
    flex-direction: column;
    > .process-bar-static,
    > .process-bar-active {
        width: 100%;
        height: 6px;
        background: ${({ theme }) => `linear-gradient(-45deg, ${theme.accentLight}, ${theme.accentMedium}, ${theme.accentDark})`};
        background-size: 400% 400%;
    }
    > .process-bar-active {
        animation: gradientBG 1s linear infinite;
    }
    .map-container {
        width: ${({ mode }) => (mode === 'popup' ? '600px' : '100%')};
        height: 350px;
    }

    @keyframes gradientBG {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`

// component
const RegionSelection = ({ mode, type, multiSelect, selected, confirmed, onBack, activeLoadRegion, setActiveLoadRegion }) => {
    const [selectedRegions, setSelectedRegions] = React.useState([])
    const [regionList, setRegionList] = React.useState([])
    const [shapeList, setShapeList] = React.useState([])
    const [loading, setLoading] = React.useState(null)
    const [mapState, setMapState] = React.useState({ map: null, maps: null })

    // styles
    const useStyles = makeStyles(() => ({
        root: {
            width: mode === 'popup' ? '240px' : '340px',
            height: '350px',
            overflow: 'overlay',
            maxWidth: 360,
            backgroundColor: grey[200],
        },
    }))

    const classes = useStyles()

    const getRegionTypeId = (regionType) => {
        switch (regionType) {
            case 'load':
                return '1'
            case 'dump':
                return '4'
            case 'stock':
                return '2'
            default:
                return '1'
        }
    }

    // fetch regions
    React.useEffect(() => {

        for (let i in type) {
            if (type.hasOwnProperty(i))
                fetchData(type[i])
        }

    }, [])

    async function fetchData(regionType) {
        setLoading(true)
        const response = await fetch(`${apiEndpoint}/region?regionTypeId=${getRegionTypeId(regionType)}`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        })
        const data = await response.json()
        setRegionList(prev => [...prev, ...data.filter(({ loc }) => loc && loc.coordinates && loc.coordinates[0] && loc.coordinates[0].length)])
        setLoading(false)
    }

    // set shape list once regions are fetched and maps api is loaded
    React.useEffect(() => {
        if (mapState.maps && regionList.length) {
            // eslint-disable-next-line no-use-before-define
            setShapes(regionList)
            setSelectedRegions(selected)
        }
    }, [mapState.maps, regionList])

    // toggle selected regions visibility
    React.useEffect(() => {

        if (setActiveLoadRegion && !selectedRegions.length) {
            setActiveLoadRegion(null)
        }

        shapeList.forEach(({ id, polygon }) => {
            polygon.setOptions({
                strokeColor: selectedRegions.includes(id) ? lightBlue[300] : grey[500],
                fillColor: selectedRegions.includes(id) ? fade(lightBlue[300], 0.4) : fade(grey[500], 0.4),
            })
        })
        // center the map to last updated region
        if (selectedRegions.length) {
            const shape = shapeList.find(({ id }) => id === selectedRegions[selectedRegions.length - 1])

            mapState.map.setCenter(getPolygonCenter(shape.polygon))
            mapState.map.setZoom(calculateZoom(shape.polygon))
        }
    }, [selectedRegions])

    const setShapes = data => {
        const shapes = data.map(({ id, loc }) => {
            const paths = loc.coordinates[0].map(([lng, lat]) => ({ lat, lng }))
            return {
                id,
                polygon: new mapState.maps.Polygon({
                    paths,
                    strokeColor: grey[300],
                    fillColor: fade(grey[300], 0.4),
                    strokeWeight: 2,
                    customInfo: id.toString(),
                }),
            }
        })
        shapes.forEach(({ polygon }) => {
            polygon.setMap(mapState.map)
            mapState.maps.event.addListener(polygon, 'click', function() {
                // eslint-disable-next-line
                handleSelectRegion(parseInt(this.customInfo))
            })
        })
        setShapeList(shapes)
    }

    const handleSelectRegion = id => {
        // set selected region(s)
        if (!multiSelect) {
            setSelectedRegions(selectedRegions.includes(id) ? [] : [id])
        } else {

            if (setActiveLoadRegion) {
                const region = regionList.filter(r => r.id === id)
                if (!selectedRegions.length) {
                    setActiveLoadRegion(region[0].regionTypeId)
                    const list = selectedRegions.includes(id) ? selectedRegions.filter(r => r !== id) : selectedRegions.concat(id)
                    setSelectedRegions(list)
                }

                if (activeLoadRegion && region[0].regionTypeId === activeLoadRegion) {
                    const list = selectedRegions.includes(id) ? selectedRegions.filter(r => r !== id) : selectedRegions.concat(id)
                    setSelectedRegions(list)
                }

            } else {
                const list = selectedRegions.includes(id) ? selectedRegions.filter(r => r !== id) : selectedRegions.concat(id)
                setSelectedRegions(list)
            }

        }
    }

    return (
        <RegionSelectionStyles mode={mode}>
            <div className={`process-bar-${loading ? 'active' : 'static'}`}/>
            <div style={{ display: 'flex' }}>
                <div className={classes.root}>
                    <List dense component="nav">
                        {regionList.map(({ id, name, regionTypeId }) => (
                            <StyledListItem key={id} button selected={selectedRegions.includes(id)}
                                            onClick={() => handleSelectRegion(id)}>
                                <ListItemText
                                    style={{ opacity: activeLoadRegion ? activeLoadRegion !== regionTypeId ? .3 : 1 : 1 }}
                                    primary={name}/>
                            </StyledListItem>
                        ))}
                    </List>
                    <Divider/>
                </div>
                <div className="map-container">
                    <GoogleMap
                        bootstrapURLKeys={{ key: 'AIzaSyAXPja1j9Bh3bfw4041F7K_f2vkGsV39c0', libraries: 'drawing' }}
                        defaultCenter={defaultCenter}
                        defaultZoom={defaultZoom}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => {
                            handleApiLoaded(map, maps, 'silver')
                            setMapState({ map, maps })
                        }}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: mode === 'wizard' ? 'flex-start' : 'center' }}>
                {mode === 'wizard' && <StyledButton onClick={onBack}>Geri</StyledButton>}
                <StyledButton
                    variant="contained"
                    color="primary"
                    disabled={loading || !selectedRegions.length}
                    onClick={() => confirmed(regionList.filter(region => selectedRegions.includes(region.id)))}
                >
                    {mode === 'popup' ? 'Sakla' : 'İleri'}
                </StyledButton>
            </div>
        </RegionSelectionStyles>
    )
}

RegionSelection.propTypes = {
    mode: PropTypes.oneOf(['popup', 'wizard']),
    type: PropTypes.any.isRequired,
    multiSelect: PropTypes.bool,
    confirmed: PropTypes.func.isRequired,
    onBack: PropTypes.func,
    selected: PropTypes.arrayOf(PropTypes.number),
}

RegionSelection.defaultProps = {
    mode: 'popup',
    multiSelect: false,
    onBack: () => {
    },
    selected: [],
}

export default RegionSelection
