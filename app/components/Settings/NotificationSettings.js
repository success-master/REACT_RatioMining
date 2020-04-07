import React, { useState, useEffect } from 'react'
import { Grid, MenuItem } from '@material-ui/core'
import { toast } from 'react-toastify'
import { StyledInput } from '../../material-ui'
import { fetchData, getAccessToken } from '../../utils'

//TEMPORARY - 3011
const apiEndpoint = 'https://cors-anywhere.herokuapp.com/http://206.81.27.243:3011'

const NotificationSettings = () => {
    const [notificationSettings, setNotificationSettings] = useState({
        operationNotificationType: '',
        vehicleNotificationType: '',
        personalFallNotificationType: '',
        specialNotificationType: '',
    })

    const fetchNotificationSettings = async () => {
        //NEW API VERSION - TEMPORARY
        const response = await fetch(`${apiEndpoint}/notificationsetting`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        })
        const parsedResponse = await response.json()
        setNotificationSettings(parsedResponse[0])
    }

    const putNotificationType = async ({ name, value }) => {
        const newNotifSettings = { ...notificationSettings, [name]: value }
        setNotificationSettings(newNotifSettings)

        const response = await fetch(`${apiEndpoint}/notificationsetting/${notificationSettings.id}`, {
            method: 'PUT',
            body: JSON.stringify(newNotifSettings),
            headers: {
                'Content-Type': 'application/json',
                'ratio-auth': getAccessToken(),
            },
        })

        const parsedResponse = await response.json()
        if (parsedResponse.errors) {
            toast.error('Ayar Güncellenemedi')
        } else {
            toast.success('Güncellendi');
        }

        fetchNotificationSettings()
    }

    useEffect(() => {
        fetchNotificationSettings()
    }, [])

    return (
        <>
            <Grid container spacing={2} alignItems="center" justify="space-between">
                <span>Personel Düşme Bildirimi</span>

                <Grid item xs={12} md={4} lg={3}>
                    <StyledInput
                        select
                        name="personalFallNotificationType"
                        value={notificationSettings.personalFallNotificationType}
                        onChange={e => putNotificationType(e.target)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        disabled={!notificationSettings}
                    >
                        <MenuItem key="option-popup" value="pop-up">
                            Pop-up Bildirim
                        </MenuItem>
                        <MenuItem key="option-standart" value="standart">
                            Standart Bildirim
                        </MenuItem>
                        <MenuItem key="option-alt" value="alt">
                            Alt Bildirim
                        </MenuItem>
                    </StyledInput>
                </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" justify="space-between">
                <span>Operasyon Bildirimi</span>
                <Grid item xs={12} md={4} lg={3}>
                    <StyledInput
                        select
                        name="operationNotificationType"
                        value={notificationSettings.operationNotificationType}
                        onChange={e => putNotificationType(e.target)}
                        margin="dense"
                        variant="outlined"
                        //error={!validState.vehicletype}
                        fullWidth
                        //disabled={loadingOptions}
                    >
                        <MenuItem key="option-popup" value="pop-up">
                            Pop-up Bildirim
                        </MenuItem>
                        <MenuItem key="option-standart" value="standart">
                            Standart Bildirim
                        </MenuItem>
                        <MenuItem key="option-alt" value="alt">
                            Alt Bildirim
                        </MenuItem>
                    </StyledInput>
                </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" justify="space-between">
                <span>Araç Bildirimi</span>
                <Grid item xs={12} md={4} lg={3}>
                    <StyledInput
                        select
                        name="vehicleNotificationType"
                        value={notificationSettings.vehicleNotificationType}
                        onChange={e => putNotificationType(e.target)}
                        margin="dense"
                        variant="outlined"
                        //error={!validState.vehicletype}
                        fullWidth
                        //disabled={loadingOptions}
                    >
                        <MenuItem key="option-popup" value="pop-up">
                            Pop-up Bildirim
                        </MenuItem>
                        <MenuItem key="option-standart" value="standart">
                            Standart Bildirim
                        </MenuItem>
                        <MenuItem key="option-alt" value="alt">
                            Alt Bildirim
                        </MenuItem>
                    </StyledInput>
                </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" justify="space-between">
                <span>Özel Bildirimi</span>
                <Grid item xs={12} md={4} lg={3}>
                    <StyledInput
                        select
                        name="specialNotificationType"
                        value={notificationSettings.specialNotificationType}
                        onChange={e => putNotificationType(e.target)}
                        margin="dense"
                        variant="outlined"
                        //error={!validState.vehicletype}
                        fullWidth
                        //disabled={loadingOptions}
                    >
                        <MenuItem key="option-popup" value="pop-up">
                            Pop-up Bildirim
                        </MenuItem>
                        <MenuItem key="option-standart" value="standart">
                            Standart Bildirim
                        </MenuItem>
                        <MenuItem key="option-alt" value="alt">
                            Alt Bildirim
                        </MenuItem>
                    </StyledInput>
                </Grid>
            </Grid>
        </>
    )
}

export default NotificationSettings
