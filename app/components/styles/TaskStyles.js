import styled from 'styled-components'
import { teal, brown } from '@material-ui/core/colors'
import { darken } from '@material-ui/core/styles'

export default styled.div`
    width: 100%;
    display: flex;
    border: 1px solid ${props => props.theme.lightgray};
    border-radius: 5px;
    margin-bottom: 10px;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

    .color-tag {
        width: 10px;
        background-color: ${props => (props.type !== 'drill' ? teal[600] : brown[600])};
        margin-right: 10px;
    }

    .block-container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .duration-container {
        display: flex;
        align-items: center;
        font-size: 12px;
        margin: 5px 0;

        > svg {
            stroke: #e51a1a;
            fill: #e51a1a;
            margin-right: 10px;
        }

        > p:not(:last-child) {
            margin-right: 20px;
        }
    }

    .horizontal-container {
        display: flex;
        > div:first-child {
            flex-grow: 1;
        }
    }

    .vertical-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 10px;
        margin-right: 10px;

        button {
            border: none;
            border-radius: 5px;
            outline: none;
            padding: 5px;
            background-color: #aaa;
            cursor: pointer;

            &:hover {
                background-color: #777;
            }
        }

        svg {
            width: 20px;
            height: 20px;
        }
    }

    .row {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 12px;

        svg {
            color: ${props => props.theme.gray};
        }
    }

    .tile {
        width: 90px;
        height: 100px;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid ${props => props.theme.lightgray};
        border-radius: 5px;
        overflow: hidden;
        text-align: center;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

        .tile-inner:not(:last-child) {
            border-bottom: 1px solid ${props => props.theme.lightgray};
        }
    }

    .tile-inner {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 2.5px 5px;
    }

    .horizontal-line {
        border: 1px solid ${darken(teal[200], 0.2)};
        position: relative;
        flex-grow: 1;
        margin-left: 5px;
        margin-right: 15px;

        img {
            position: absolute;
            top: -10px;
        }
    }

    .progress-bar {
        flex-grow: 1;
        margin-left: 5px;
        margin-right: 15px;
    }

    .task-actions {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 4px;
        > button {
            margin: 2px 0;
        }
    }
`
