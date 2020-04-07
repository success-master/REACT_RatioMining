import styled from 'styled-components'

export default styled.div`
    padding: 0px 20px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .new-personnel-desc {
        margin-top: 10px;
        &.success {
            color: green;
        }
        &.fail {
            color: red;
        }
    }
    p {
        font-weight: bold;
        color: ${props => props.theme.contentText};
        margin-right: 10px;
    }

    > .form-section {
        font-size: 20px;
        align-self: center;
    }

    > .item {
        display: flex;
        flex-direction: row;
        align-items: center;

        > .input-field {
            width: 300px;
        }
    }

    > .button-container {
        display: flex;
        flex-direction: row;
        > button {
            width: 150px;
            margin: 10px;
        }
    }
`
