import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import truck from '../../static/dump-truck.png'
import excavator from '../../static/excavator.png'
import { fetchData } from '../utils'

const Vehicle = ({ id, type, size, operationId, missionId }) => {
    const intervalVehicle = React.useRef(null)
    const [ratio, setRatio] = useState(0)
    const [revert, setRevert] = useState(false)

    const clearIntervals = () => {
        window.clearInterval(intervalVehicle.current)
    }

    useEffect(() => {
        if (operationId)
            intervalVehicle.current = window.setInterval(async () => {
                const response = await fetchData(`/missionDetailed?missionId=${missionId}&operationId=${operationId}&vehicleId=${id}`)
                if (response.length > 0) {
                    const responseExtra = response[0] && JSON.parse(response[0].extra)

                    setRatio(responseExtra && responseExtra.roadProgress)
                    setRevert(responseExtra && responseExtra.state === 2 && responseExtra.prevState === 3)
                }
            }, 5000)
        return clearIntervals
    }, [])

    return (
        <img
            style={{
                display: 'block',
                height: size === 'small' ? '20px' : '25px',
                left: `${ratio}%`,
                transform: revert && 'scaleX(-1)',
            }}
            src={type === 'truck' ? truck : excavator}
            alt="vehicle"
        />
    )
}

Vehicle.propTypes = {
    type: PropTypes.oneOf(['truck', 'excavator']).isRequired,
    size: PropTypes.oneOf(['small', 'medium']),
    id: PropTypes.number.isRequired,
    operationId: PropTypes.number.isRequired,
    missionId: PropTypes.number.isRequired,
}

Vehicle.defaultProps = {
    size: 'small',
}

export default Vehicle
