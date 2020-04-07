import styled from 'styled-components'
import { teal, amber, grey } from '@material-ui/core/colors'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;

    .message-strip {
        display: flex;
        background-color: ${fade(amber[200], 0.2)};
        border: 1px solid ${amber[400]};
        border-radius: 2px;
        padding: 2px;
        margin-bottom: 10px;
        > svg {
            margin: 0 10px;
        }
    }

    .regions {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        > svg {
            margin: 0 20px;
        }
        &__load,
        &__dump {
            display: flex;
            flex-direction: column;
        }
    }

    .title-secondary {
        color: ${teal[600]};
        margin-left: 24px;
    }

    .title-secondary,
    .MuiTypography-root.MuiTypography-h6 {
        font-size: 16px;
        font-weight: 600;
    }

    .MuiFormControl-marginDense {
        align-self: flex-start;
    }

    .primary-arrow {
        color: ${teal[600]};
    }

    .primary-warning {
        color: ${grey[700]};
    }

    .footer-toolbar {
        display: flex;
        justify-content: center;
        align-items: stretch;
        margin-top: 20px;
        > div,
        > button {
            margin: 0;
        }
        > button {
            margin-left: 10px;
        }
    }
`
