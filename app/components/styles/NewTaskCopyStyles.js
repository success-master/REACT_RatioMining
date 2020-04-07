import styled from 'styled-components'
import { teal, green, blue, brown } from '@material-ui/core/colors'
import { darken, fade } from '@material-ui/core/styles/colorManipulator'

export default styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ type }) => (type === 'gem' ? teal[600] : brown[600])};
    background-color: ${({ type }) => (type === 'gem' ? fade(teal[600], 0.1) : fade(brown[600], 0.1))};
    border-radius: 5px;
    padding: 10px 5px;

    .mission {
        display: flex;
        align-items: center;

        > .line {
            border: 1px solid ${props => props.theme.gray};
            position: relative;
            flex-grow: 1;
            margin: 0 5px;
        }
    }

    > button {
        align-self: center;
    }

    .tile-btn {
        width: 100%;
        height: 100%;
        margin-top: 0;
        font-size: inherit;
        text-transform: inherit;
        font-weight: inherit;
        line-height: inherit;
        & .MuiButton-label {
            height: 84px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            > svg:first-child,
            > img {
                margin-bottom: 10px;
            }
        }
    }

    .primary-add {
        color: ${teal[400]};
    }

    .primary-map {
        color: ${blue[800]};
    }

    .secondary {
        color: ${darken(green[400], 0.2)};
    }

    .tile {
        width: 90px;
        height: 100px;
        margin: 0 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid ${({ type }) => (type === 'gem' ? teal[400] : brown[500])};
        border-radius: 5px;
        text-align: center;
        font-family: Arial;
        font-size: 13.3333px;
        position: relative;

        .tile-inner:not(:last-child) {
            border-bottom: 1px solid ${props => props.theme.gray};
        }
    }

    .truck-container {
        width: 100%;
        display: flex;
        align-items: center;
        position: absolute;
        top: -25px;
        left: 10px;
        height: 50px;
    }

    .removable-truck {
        width: 50px;
        height: 50px;
        border: 1px solid ${props => props.theme.lightgray};
        border-radius: 50%;
        padding: 5px;
        margin-right: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
    }

    .button-container {
        display: flex;
        justify-content: center;
        > button:first-child {
            margin-right: 20px;
        }
    }
`
