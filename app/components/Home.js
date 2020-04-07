import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { ToggleButtonGroup } from '@material-ui/lab'
import { Notifications } from '@material-ui/icons'
import GoogleMap from './GoogleMap'
import { StyledToggleButton, StyledFab } from '../material-ui'
import { fetchPersonnel, fetchVehicles, fetchRegions, fetchRoads, fetchNotifications } from '../store/actions'
import MapStyles from './styles/MapStyles'
import withLayout from '../hoc/withLayout'
import QuickViewCard from './QuickViewCard'
import NotificationList from './NotificationsTable'
import Popup from '../hoc/Popup'
import Loader from './Loader'

const Map = () => {
    const [cardOpen, setCardOpen] = React.useState(false)
    const [cardType, setcardType] = React.useState('personnel')
    const [showNotifiations, setShowNotifiations] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState(null)
    const [visibleObjects, setVisibleObjects] = React.useState(['vehicles', 'personnel'])
    const intervalVehicle = React.useRef(null)
    const intervalPersonnel = React.useRef(null)
    const intervalNotifications = React.useRef(null)
    const { fetchingPersonnel, fetchingVehicles, personnel, vehicles, regions, roads } = useSelector(state => state.map)
    const { notifications } = useSelector(state => state.notifications)
    const unreadNotifications = notifications.filter(function(notification) {
        return notification.active == true;
    })
    const dispatch = useDispatch()

    const clearIntervals = () => {
        window.clearInterval(intervalVehicle.current)
        window.clearInterval(intervalPersonnel.current)
    }

    React.useEffect(() => {
        if (visibleObjects.includes('personnel')) {
            dispatch(fetchPersonnel())
            intervalPersonnel.current = window.setInterval(() => !fetchingPersonnel && dispatch(fetchPersonnel()), 10000)
        }

        if (visibleObjects.includes('vehicles')) {
            dispatch(fetchVehicles())
            intervalVehicle.current = window.setInterval(() => !fetchingVehicles && dispatch(fetchVehicles()), 10000)
        }

        return clearIntervals
    }, [visibleObjects])

    React.useEffect(() => {
        dispatch(fetchNotifications())
        intervalNotifications.current = window.setInterval(() => dispatch(fetchNotifications()), 30000)

        dispatch(fetchRegions())
        dispatch(fetchRoads())

        return () => window.clearInterval(intervalNotifications)
    }, [])

    const toggleQuickViewCard = (type, id) => {
        setSelectedId(id)
        setcardType(type)
        setCardOpen(true)
    }

    return (
        <MapStyles>
            {(fetchingPersonnel || fetchingVehicles) && <Loader />}
            <GoogleMap
                personnel={visibleObjects.includes('personnel') ? personnel : []}
                vehicles={visibleObjects.includes('vehicles') ? vehicles : []}
                regions={regions}
                roads={roads}
                onClickObject={toggleQuickViewCard}
            />
            <div className="notifications-button">
                <div className="notifications-button__inner">
                    {unreadNotifications.length > 0 && <div className="notification-count">{unreadNotifications.length}</div>}
                    <StyledFab size="medium" color="inherit" variant="round" onClick={() => setShowNotifiations(true)}>
                        <Notifications fontSize="large" />
                    </StyledFab>
                </div>
            </div>
            <div className="toggle-button-group">
                <ToggleButtonGroup value={visibleObjects} size="small" onChange={(e, selections) => setVisibleObjects(selections)}>
                    <StyledToggleButton value="vehicles">
                        <p>Araçlar</p>
                    </StyledToggleButton>
                    <StyledToggleButton value="personnel">
                        <p>Personel</p>
                    </StyledToggleButton>
                </ToggleButtonGroup>
            </div>
            <Popup show={cardOpen} onClose={() => setCardOpen(false)}>
                {cardOpen && <QuickViewCard type={cardType} id={selectedId} />}
            </Popup>
            <Popup show={showNotifiations} title="Bildirimler" onClose={() => setShowNotifiations(false)}>
                {showNotifiations && <NotificationList notifications={notifications} />}
            </Popup>
        </MapStyles>
    )
}

Map.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
}

export default withLayout(Map)
