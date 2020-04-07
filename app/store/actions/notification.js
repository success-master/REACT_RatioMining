import * as types from './types'

export const fetchNotifications = () => ({ type: types.FETCH_NOTIFICATIONS })
export const fetchNotificationsBegin = () => ({ type: types.FETCH_NOTIFICATIONS_BEGIN })
export const fetchNotificationsEnd = notifications => ({ type: types.FETCH_NOTIFICATIONS_END, payload: { notifications } })
