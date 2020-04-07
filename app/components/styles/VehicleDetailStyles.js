import styled from 'styled-components'

export default styled.div`
    overflow: auto;
    > .vehicle-detail-container {
        border-radius: 5px;
        background-color: #fff;

        .top-button-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
        }

        .title {
            width: 100%;
            padding: 20px;
            font-size: 30px;
            font-weight: bold;
            color: ${props => props.theme.contentText};
        }

        .MuiExpansionPanel-root {
            margin: 10px;
            border-radius: 10px;
            box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.17);

            &.MuiExpansionPanel-root::before {
                display: none;
            }

            .MuiExpansionPanelDetails-root {
                max-height: 400px;
                padding: 0px;
            }
            .MuiExpansionPanelSummary-content {
                margin: 0px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }

        .live-content-table {
            .content-cell {
                padding: 10px;
                text-align: center;
                background-color: #fbfdfe;
                border-collapse: collapse;
                border: 1px solid #e9ecef;
                color: #4e4e4e;
            }

            .content-title {
                font-weight: bold;
                margin: 5px;
            }
        }

        .chart-title {
            font-size: 20px;
            font-weight: bold;
            color: #666666;
            margin: 20px;
        }
        .chart-card {
            margin: 10px;
            padding: 15px;
        }
        .chart-footer-row {
            display: flex;
            justify-content: space-between;
            margin: 20px;
            color: ${props => props.theme.contentText};
        }
        .chart-footer-column {
            color: ${props => props.theme.contentText};
            display: flex;
            flex-direction: column;
        }
        .footer-item {
            margin: 5px;
        }
        .info-title {
            font-weight: bold;
            margin: 5px;
        }

        .details {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;

            .info {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 10px;

                .detail-title {
                    color: #666666;
                    font-size: 20px;
                    margin: 10px;
                }
                .detail-value {
                    color: #666666;
                    font-size: 22px;
                    font-weight: bold;
                }
            }
        }

        .button-container {
            width: 100%;
            margin: 10px;
            display: flex;
            justify-content: center;
        }

        .new-issue-button {
            margin: 10px;
        }

        .add-icon {
            font-size: 35px;
            color: ${props => props.theme.green};
        }
    }
    .modal-button-container {
        display: flex;
        justify-content: center;
        .MuiButtonBase-root {
            margin: 10px;
        }
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

export const TooltipText = styled.p`
    font-size: 20px;
    margin: 10px;
`
