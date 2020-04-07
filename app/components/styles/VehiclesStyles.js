import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import Switch from '@material-ui/core/Switch'

export default styled.div`
    overflow: auto;
    > .vehicles-container {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: flex-start;
        background-color: #fff;
        border-radius: 10px;

        > .new-vehicle-container {
            padding: 20px 20px;
        }

        .add-icon,
        .remove-icon {
            font-size: 35px;
            color: ${props => props.theme.green};
        }

        .vehicle-icon {
            height: 40px;
            width: 40px;
        }
    }
`

export const StyledSwitch = withStyles({
    switchBase: {
        '&$checked': {
            color: green[500],
        },
        '&$checked + $track': {
            backgroundColor: green[500],
        },
        '&.Mui-checked:hover': {
            backgroundColor: 'rgb(165, 215, 167,.25)',
        },
    },
    checked: {},
    track: {},
})(Switch)
