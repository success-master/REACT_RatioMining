import styled from 'styled-components'

export default styled.div`
    margin: 20px;

    .MuiExpansionPanel-root {
        margin: 10px;
        border-radius: 10px;
        box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.17);
        color: #6a6a6a;

        .expansion-title {
            font-size: 20px;
            font-weight: bold;
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
    .spin {
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
`
