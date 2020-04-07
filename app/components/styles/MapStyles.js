import styled from 'styled-components'
import { blueGrey, grey, red } from '@material-ui/core/colors'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .action-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
        padding: 20px;
    }

    .toggle-button-group {
        position: absolute;
        top: 25px;
        right: 25px;
        z-index: 50;
        box-shadow: ${props => props.theme.bsDark};
    }

    .notifications-button {
        position: absolute;
        top: 25px;
        left: 25px;
        z-index: 600;
        &__inner {
            position: relative;
        }
    }

    .notification-count {
        width: 22px;
        height: 22px;
        padding: 12px;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        cursor: default;
        position: absolute;
        right: -8px;
        top: -8px;
        color: #fff;
        background-color: ${red[600]};
        z-index: 700;
    }

    .toast-container {
        position: absolute;
        width: 320px;
    }

    .toast-inner {
        background: ${fade(blueGrey[600], 0.9)};
        color: #fff;
        text-align: center;
    }

    .toast-inner-gray {
        background: ${fade(grey[900], 0.6)};
    }

    .pulse {
        animation: pulsate 0.3s normal;
        animation-timing-function: ease-out;
    }

    @keyframes pulsate {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    @media screen and (max-width: 56em) {
        .action-container {
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 10px;
            padding: 5px 10px;
        }
    }
`

// Animation styles for the backdrop
export const AnimationStylesBackdrop = styled.div`
    .backdrop-enter {
        opacity: 0;
    }
    .backdrop-enter-active {
        opacity: 1;
        transition: opacity 0.2s;
    }
    .backdrop-exit {
        opacity: 1;
    }
    .backdrop-exit-active {
        opacity: 0;
        transition: opacity 0.2s;
    }
`

// Backdrop styles
export const Backdrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.65);
    transition: all 0.2s;
    z-index: 10;
`

export const ActionOptionsStyles = styled.div`
    display: flex;
    justify-content: center;
    > button {
        margin: 0 5px;
    }
`
