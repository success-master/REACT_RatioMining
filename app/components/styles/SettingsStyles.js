import styled from 'styled-components'

export default styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: auto;

    .page-title {
        color: #fff;
        font-weight: bold;
        font-size: 30px;
        margin: 20px;
    }
    .MuiCard-root {
        overflow: initial;
    }

    .setting-section {
        width: 100%;
        padding: 20px 20px;
        margin-bottom: 20px;

        .section-title {
            color: #087198;
            font-weight: bold;
            font-size: 25px;
            margin-bottom: 15px;
        }
    }

    .add-icon,
    .remove-icon {
        font-size: 35px !important;
        color: ${props => props.theme.green};
    }

    .space-between {
        display: flex;
        justify-content: space-between;
    }
`
