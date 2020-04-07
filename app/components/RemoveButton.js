import React from 'react'
import PropTypes from 'prop-types'
import { FaMinusCircle } from 'react-icons/fa'
import RemoveButtonStyles from './styles/RemoveButtonStyles'

const RemoveButton = ({ offset, clicked }) => (
    <RemoveButtonStyles offset={offset} onClick={clicked}>
        <FaMinusCircle size={20} />
    </RemoveButtonStyles>
)

RemoveButton.propTypes = {
    offset: PropTypes.number.isRequired,
    clicked: PropTypes.func.isRequired,
}

export default RemoveButton
