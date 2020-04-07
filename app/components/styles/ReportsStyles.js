import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import { StyledButton } from '../../material-ui'

export default styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .page-title {
        color: #fff;
        font-weight: bold;
        font-size: 30px;
        margin: 20px;
    }

    .filter-buttons-container {
        margin-bottom: 20px;
        width: 100%;
        .filter-button {
            width: 100%;
            height: 100%;
            font-weight: bold;
            color: ${props => props.theme.accentDark};
            border-radius: 10px;
            border: 1px solid ${props => props.theme.gray};

            .filter-button-content {
                display: flex;
                .filter-button-icon {
                    font-size: 40px;
                    margin-right: 20px;
                }
                .filter-button-text {
                    text-align: right;
                    font-size: 15px;
                    margin-top: 10px;
                }
            }
        }
    }

    .report-table {
        border-radius: 10px;
        box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.17);
    }

    .input-email{
        margin:30px
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
`
