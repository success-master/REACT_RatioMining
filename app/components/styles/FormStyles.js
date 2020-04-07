import styled from 'styled-components'

export default styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    fieldset {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        button {
            margin: 10px auto;
        }
        &[disabled] {
            opacity: 0.5;
            button[type='submit']:hover {
                background-color: ${props => props.theme.blue};
            }
        }
    }
    .wiggle {
        animation: wiggle 0.3s normal;
    }
    .button-inline {
        position: absolute;
        height: 40px;
        top: calc(50% + 2px);
        transform: translateY(-50%);
        right: 0;
        min-width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background-color: transparent;
        color: ${props => props.theme.gray};
        border: 1px solid transparent;
        border-left: 1px solid ${props => props.theme.lightgray};
        border-radius: 0 4px 4px 0;
        margin: 0;
        transition: background-color 0.2s;
        &:focus {
            outline: none;
        }
        &:active {
            box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
        }
    }

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
