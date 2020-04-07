import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import { StyledButton } from '../../material-ui'

export default styled.div`
    overflow: auto;

    > .mission-detail-container {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: #fff;
        border-radius: 10px;

        .back-button {
            margin: 15px !important;
        }

        .page-title {
            width: 100%;
            border-bottom: 1px solid ${props => props.theme.blue};
            padding: 20px;
            font-size: 30px;
            font-weight: bold;
            color: ${props => props.theme.contentText};
        }

        .title {
            width: 100%;
            padding: 20px;
            font-size: 20px;
            font-weight: bold;
            color: ${props => props.theme.contentText};
        }

        .MuiExpansionPanel-root {
            &.MuiExpansionPanel-root::before {
                display: none;
            }

            .MuiExpansionPanelDetails-root {
                padding: 0px;
            }
            .MuiExpansionPanelSummary-content {
                margin: 0px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }

        .MuiExpansionPanel-root {
            box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.17);
            border-radius: 10px;
        }

        .mission-detail-table {
            margin-bottom: 10px;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            overflow: hidden;

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

            .success-text {
                color: green;
            }
        }

        .chart-title {
            font-size: 20px;
            margin: 20px;
            font-weight: bold;
            color: #666666;
        }
        .chart-card {
            padding: 15px;
        }
        .chart-footer-row {
            margin: 15px;
            color: ${props => props.theme.contentText};
            display: flex;
            justify-content: space-between;
        }
        .chart-footer-column {
            margin: 15px;
            color: ${props => props.theme.contentText};
            display: flex;
            flex-direction: column;
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
`

export const TooltipText = styled.p`
    font-size: 20px;
    margin: 10px;
`

export const BackButton = withStyles({
    root: {
        padding: '5px 30px',
        marginTop: '10px',
        marginBottom: '10px',
        backgroundColor: 'transparent !important',
        color: '#fff',
    },
})(StyledButton)
