import styled from 'styled-components'
import { Brightness1 } from '@material-ui/icons'

export default styled.div`
    .MuiExpansionPanel-root {
        margin: 10px;
        border-radius: 10px;
        box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.17);
        color: #6a6a6a;

        .expansion-title {
            display: flex;
            align-items: center;
            font-size: 20px;
            font-weight: bold;
            .add-icon,
            .remove-icon {
                margin: 5px;
            }
        }

        &.MuiExpansionPanel-root::before {
            display: none;
        }

        .MuiExpansionPanelSummary-content {
            margin: 0px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .MuiExpansionPanelDetails-root {
            display: block;
        }
    }

    .MuiSelect-selectMenu {
        display: flex;
        align-items: center;
    }

    .long-andornment {
        width: 100px;
    }

    .type-name {
        margin: 10px;
        font-weight: bold;
        font-size: 20px;
    }

    .buttons-container {
        display: flex;
        justify-content: center;
        margin: 10px;
    }

    .emails {
        margin: 10px;
        max-height: 400px;
        overflow: auto;
        border-radius: 5px;
        box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.17);

        .email {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            &:nth-of-type(even) {
                background: rgba(246, 249, 252, 0.72);
            }
        }
    }

    .popup-content {
        margin: 20px;
        text-align: center;
    }
    .popup-buttons {
        display: flex;
        justify-content: center;
    }

    .spin {
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
`
export const Circle = styled(Brightness1)`
    color: ${props => props.fill};
    margin-right: 10px;
`
