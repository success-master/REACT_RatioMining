import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ErrorStyles = styled.div`
    width: ${props => props.fullwidth ? '100%' : 'auto'};
    margin-bottom: 20px;
    text-align: center;
    color: white;
    background-color: red;
    border: 1px solid red;
    border-radius: 5px;
    animation: wiggle 0.3s normal;

    @keyframes wiggle {
        0% {
            transform: rotate(2deg);
        }
        20% {
            transform: rotate(-2deg);
        }
        40% {
            transform: rotate(2deg);
        }
        60% {
            transform: rotate(-2deg);
        }
        80% {
            transform: rotate(2deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
`

const ErrorInline = ({ message, fullwidth }) => <ErrorStyles fullwidth={fullwidth}>{message}</ErrorStyles>

ErrorInline.propTypes = {
    message: PropTypes.string.isRequired,
    fullwidth: PropTypes.bool,
}

ErrorInline.defaultProps = {
    fullwidth: false,
}

export default ErrorInline
