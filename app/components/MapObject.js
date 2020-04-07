import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FaUser } from 'react-icons/fa'
import { green } from '@material-ui/core/colors'
import { StyledTooltip } from '../material-ui'
import truck from '../../static/dump-truck.png'
import excavator from '../../static/excavator.png'
import { apiEndpoint, getAccessToken } from '../utils'

// styles
const MapObjectStyles = styled.div`
    width: 35px;
    height: 35px;
    background-color: #fff;
    border: 1px solid ${props => props.theme.lightgray};
    border-radius: 50px;
    box-shadow: ${props => props.theme.bsDark};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    cursor: ${props => (props.enableTooltip ? 'pointer' : 'auto')};
    position: relative;
    transition: transform 0.2s;
    img {
        display: block;
        height: 100%;
    }
    p {
        position: absolute;
        top: -20px;
    }
    &:hover {
        transform: scale(${props => (props.enableTooltip ? 1.1 : 1)});
    }
`

// determine image
const getContent = type => {
    switch (type) {
        case 'truck':
            return <img src={truck} alt="vehicle" />
        case 'excavator':
            return <img src={excavator} alt="vehicle" />
        case 'personnel':
            return <FaUser size={20} color={green[600]} />
        default:
            return null
    }
}

// Map object component
const MapObject = ({ type, id, enableTooltip, clicked }) => {
    const [description, setDescription] = React.useState('')
    const [hovered, setHovered] = React.useState(false)

    const getDetail = async () => {
        setHovered(true)
        if (hovered || description !== '') return
        const response = await fetch(`${apiEndpoint}/${type === 'personnel' ? 'staff' : 'vehicle'}/${id}`, {
            headers: {
                'ratio-auth': getAccessToken(),
            },
        })
        const data = await response.json()
        setDescription(type === 'personnel' ? `${data.name} ${data.surname}` : `${data.plate}`)
    }

    return (
        <StyledTooltip title={description} onOpen={getDetail}>
            <MapObjectStyles enableTooltip={enableTooltip} onClick={() => clicked(type === 'personnel' ? 'personnel' : 'vehicle', id)}>
                {getContent(type)}
            </MapObjectStyles>
        </StyledTooltip>
    )
}

// prop types validation
MapObject.propTypes = {
    type: PropTypes.oneOf(['truck', 'excavator', 'personnel']).isRequired,
    id: PropTypes.number.isRequired,
    enableTooltip: PropTypes.bool,
    clicked: PropTypes.func,
}

// default props
MapObject.defaultProps = {
    enableTooltip: true,
    clicked: () => {},
}

// export component
export default MapObject
