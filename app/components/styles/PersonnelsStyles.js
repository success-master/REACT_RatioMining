import styled from 'styled-components'

export default styled.div`
    > .personnels-container {
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 10px;
        background-color: #fff;

        > .new-personnel-container {
            margin: 20px 20px;
        }

        .add-icon,
        .remove-icon {
            font-size: 35px;
            color: ${props => props.theme.green};
        }

        .personnel-photo {
            height: 60px;
            width: 60px;
            border-radius: 50%;
            -webkit-filter: grayscale(100%);
            filter: grayscale(100%);
        }
    }
`
