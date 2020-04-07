import React from 'react'
import styled from 'styled-components'

const LoaderStyles = styled.div`
    display: inline-block;
    width: 44px;
    height: 44px;
    margin: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 600;

    &:after {
        content: " ";
        display: block;
        width: 36px;
        height: 36px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid ${props => props.theme.accentMedium};
        border-color: ${props => props.theme.accentMedium} transparent ${props => props.theme.accentMedium} transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`
const Loader = () => <LoaderStyles />

export default Loader
