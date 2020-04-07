import styled from 'styled-components'

export default styled.div`
    margin: 20px;

    .MuiInputBase-root {
        margin: 10px;
    }

    .date-picker {
        width: 100%;
        margin: 10px;
        padding: 10px;
        border: 1px solid #c4c4c4;
        border-radius: 4px;
    }

    > .button-container {
        display: flex;
        flex-direction: row;
        > button {
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
