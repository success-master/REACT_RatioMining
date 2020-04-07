import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaCircle } from 'react-icons/fa'
import NotificationsStyles from './styles/NotificationsStyles'
import withLayout from '../hoc/withLayout'
import { theme } from './styles/Theme'
import { fetchNotifications } from '../store/actions/notification'

const Notifications = () => {
    const { notifications } = useSelector(state => state.notifications)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchNotifications())
    }, [])

    const getColorByType = type => {
        const colorMap = { operation: theme.accentMedium, vehicle: theme.orange, mission: theme.green, staff: theme.purple }
        return colorMap[type]
    }

    return (
        <NotificationsStyles>
            <div className="notifications-container">
                {notifications.map((notif, idx) => (
                    <div className="notif-row" key={`operation-notif-${idx}`}>
                        <div className="title">
                            <FaCircle className="notif-circle" color={getColorByType(notif.type)} />
                            <span>{notif.data}</span>
                        </div>
                        <span className="time"> {new Date(notif.updatedAt).toLocaleString()} </span>
                    </div>
                ))}
            </div>
        </NotificationsStyles>
    )
}

export default withLayout(Notifications)
