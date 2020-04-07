import styled from 'styled-components'

export default styled.div`
    overflow: auto;
    > .personnel-detail-container {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 10px;

        .delete-button {
            margin: 10px;
            align-self: flex-end;
        }

        .personnel-skeleton {
            margin: 20px;
        }

        .personnel-photo {
            height: 60px;
            width: 60px;
            border-radius: 50%;
            -webkit-filter: grayscale(100%);
            filter: grayscale(100%);
        }

        .MuiExpansionPanel-root {
            margin: 10px;
            border-radius: 10px;
            box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.17);

            &.MuiExpansionPanel-root::before {
                display: none;
            }

            .MuiExpansionPanelDetails-root {
                padding: 0px;
                max-height: 400px;
            }
            .MuiExpansionPanelSummary-content {
                margin: 0px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }

        .chart-card {
            margin: 10px;
            padding: 15px;
        }

        .table-infos {
            margin: 10px;
            .info {
                display: flex;
                .info-title {
                    font-weight: bold;
                    color: #666666;
                    margin-right: 5px;
                }
            }
        }

        .title {
            width: 100%;
            margin: 40px;
            font-size: 30px;
            font-weight: bold;
            color: ${props => props.theme.contentText};
        }
        .chart-title {
            font-size: 25px;
            margin: 20px;
            font-weight: bold;
            color: #666666;
        }

        .personnel-breach-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;

            .top-info-container {
                display: flex;
                .top-info-container-item {
                    display: flex;
                    align-items: center;
                    margin: 5px;
                    .colored-circle {
                        margin: 5px;
                    }
                }
            }
        }

        .details {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;

            .info {
                display: flex;
                align-items: center;
                margin-bottom: 10px;

                .info-title {
                    color: #666666;
                    font-size: 20px;
                    margin-right: 10px;
                }
                .info-value {
                    color: #666666;
                    font-size: 22px;
                    font-weight: bold;
                }
            }
        }
    }

    .modal-button-container {
        display: flex;
        justify-content: center;
        .MuiButtonBase-root {
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
    }
`

export const TooltipText = styled.p`
    font-size: 20px;
    margin: 10px;
`
