import React from 'react'
import PropTypes from 'prop-types'
import ButtonStyles from './styles/ButtonStyles'

const Button = ({ type, iconColor, centered, flex, clicked, children }) => (
    <ButtonStyles type={type} iconColor={iconColor} centered={centered} flex={flex} onClick={clicked}>
        {children}
    </ButtonStyles>
)

Button.propTypes = {
    type: PropTypes.oneOf(['light', 'emphasized', 'accept', 'reject', 'action', 'tile', 'on-line']),
    iconColor: PropTypes.string,
    flex: PropTypes.bool,
    centered: PropTypes.bool,
    clicked: PropTypes.func.isRequired,
}

Button.defaultProps = {
    type: 'light',
    iconColor: null,
    flex: false,
    centered: false,
}

export default Button
