import { amber, pink, cyan, teal, lightBlue, lime, lightGreen, grey } from '@material-ui/core/colors'
import { apiEndpoint, getAccessToken } from '../utils'
import truncate from './string'

export const getPersonnelQuickInfo = async id => {
    const responses = await Promise.all([
        fetch(`${apiEndpoint}/staff/${id}`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        }),
        fetch(`${apiEndpoint}/mission?staffId=${id}&status=1`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        }),
        fetch(`${apiEndpoint}/vehiclelog?staffId=${id}&sort=-updatedAt&offset=0&count=50`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        }),
    ])
    const [detail, mission, vehiclelog] = await Promise.all([responses[0].json(), responses[1].json(), responses[2].json()])

    let vehicle = null

    if (vehiclelog && vehiclelog[0]) {
        const vehicleResponse = await fetch(`${apiEndpoint}/vehicle/${vehiclelog[0].vehicleId}`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        })
        vehicle = await vehicleResponse.json()
    }

    return {
        ...detail,
        task: mission && mission[0] ? mission[0].task : '',
        plate: vehicle ? vehicle.plate : '',
    }
}

export const getVehicleQuickInfo = async id => {
    const responses = await Promise.all([
        fetch(`${apiEndpoint}/vehicle/${id}?children=vehicle_type`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        }),
        fetch(`${apiEndpoint}/mission?vehicleId=${id}&status=1`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        }),
        fetch(`${apiEndpoint}/vehiclelog?vehicleId=${id}&sort=-updatedAt&offset=0&count=50`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        }),
    ])
    const [detail, mission, vehiclelog] = await Promise.all([responses[0].json(), responses[1].json(), responses[2].json()])

    let staff = null
    let operation = null
    const extra = vehiclelog && vehiclelog[0] && vehiclelog[0].extra ? vehiclelog[0].extra : null

    if (vehiclelog && vehiclelog[0]) {
        const staffResponse = await fetch(`${apiEndpoint}/staff/${vehiclelog[0].staffId}`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        })
        staff = await staffResponse.json()
    }

    if (mission && mission[0]) {
        const operationResponse = await fetch(`${apiEndpoint}/operation/${mission[0].operationId}`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        })
        operation = await operationResponse.json()
    }
    let missionStatus = ''
    if (mission.prevState === 1 && mission.state === 2) missionStatus = 'Yüklü Yola Çıkmış'
    else if (mission.prevState === 2 && mission.state === 3) missionStatus = 'Boşaltılıyor'
    else if (mission.prevState === 3 && mission.state === 2) missionStatus = 'Boş Yola Çıkmış'
    else if (mission.prevState === 2 && mission.state === 1) missionStatus = 'Yükleniyor'

    return {
        ...detail,
        vehicleType: detail.vehicle_type.name,
        driverId: staff ? staff.id : '',
        driverName: staff ? `${staff.name} ${staff.surname}` : '',
        speed: extra ? extra.speed : '',
        loadamount: extra ? extra.loadamount : '',
        operation: operation ? `${operation.id} ${truncate(operation.description, 20)}` : '',
        task: mission && mission[0] ? mission[0].task : '',
        missionStatus,
    }
}

export const getRegionColor = type => {
    switch (type) {
        case 1:
            return amber[600]
        case 2:
            return pink[600]
        case 3:
            return cyan[600]
        case 4:
            return teal[600]
        case 5:
            return lightBlue[600]
        case 6:
            return lime[600]
        case 7:
            return lightGreen[600]
        default:
            return lightBlue[600]
    }
}
