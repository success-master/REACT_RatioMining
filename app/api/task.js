import { apiEndpoint, getAccessToken } from '../utils'

const getTaskDetail = async id => {
    // fetch operation detail
    const responseOperation = await fetch(`${apiEndpoint}/operation/${id}`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    const operation = await responseOperation.json()

    // fetch missions of operation
    const responseMissions = await fetch(`${apiEndpoint}/missionDetailed?operationId=${id}`, {
        headers: {
            'ratio-auth': getAccessToken(),
        },
    })
    const missions = await responseMissions.json()

    // construct detail data for visualization
    // create empty array for rows
    operation.rows = []

    // iterate over missions
    missions.forEach(mission => {
        // first check if a row already exists with the same start - end locations
        const oExisting = operation.rows.find(row => row.startRegionId === mission.startRegionId && row.endRegionId === mission.endRegionId)

        // if so, add new vehicle to existing row
        if (oExisting) oExisting.vehicles.push(mission.vehicle)

        // if not, add new row
        if (!oExisting)
            operation.rows.push({
                ...mission,
                start: mission.start,
                end: mission.end,
                vehicles: mission.vehicle ? [mission.vehicle] : [],
            })
    })
    return operation
}

export default getTaskDetail
