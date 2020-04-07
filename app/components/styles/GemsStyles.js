import styled from 'styled-components'
import { deepOrange, green, blueGrey } from '@material-ui/core/colors'

export default styled.div`
    width: 100%;
    height: 100%;
    margin:10px;
    padding:10px;
    background:white;
    border-radius:5px

    .secondary {
        color: ${deepOrange[600]};
    }

    .card-container {
        display: flex;
        > div {
            margin: 0 10px;
        }
    }

    .MuiStepIcon-root.MuiStepIcon-active {
        color: ${blueGrey[500]};
    }

    .MuiStepIcon-root.MuiStepIcon-completed {
        color: ${green[600]};
    }

    .MuiTypography-h5 {
        font-size: 1rem;
    }

    .wide-container {
        margin-bottom: 10px;
    }

    .wide,
    .wide-container {
        width: 100%;
        border-radius: 0;
    }
`
