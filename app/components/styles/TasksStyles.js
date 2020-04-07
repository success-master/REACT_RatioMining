import styled from 'styled-components'
import { teal } from '@material-ui/core/colors'

export default styled.div`
    > .tasks-container {
        height: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: #fff;
        overflow: hidden;

        h3 {
            margin-bottom: 10px;
        }

        > button {
            margin-bottom: 10px;
        }

        .primary {
            color: ${teal[400]};
        }

        .operation-type-container {
            display: flex;
            margin-bottom: 10px;
            > button:first-child {
                margin-right: 10px;
            }
        }

        .task-list-container {
            width: 100%;
            overflow: auto;
        }
    }
`
