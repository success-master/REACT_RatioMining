import styled from 'styled-components'

export default styled.div`
    background-image: linear-gradient(to right bottom, ${props => props.theme.accentDark} 0%, ${props => props.theme.accentMedium} 80%);
    background-repeat: no-repeat;
    background-size: 100% 50%;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    > img {
        display: block;
        max-height: 100px;
        margin-top: 150px;
        margin-bottom: 50px;
    }

    > .form-container {
        width: 50%;
        height: 50%;
        max-width: 700px;
        max-height: 400px;
        padding: 0 150px;
        border: 1px solid ${props => props.theme.lightgray};
        border-radius: 5px;
        box-shadow: ${props => props.theme.bs};
        background: #fff;
        z-index: 100;
        @media only screen and (max-width: 90em) {
            width: 90%;
        }
        @media only screen and (max-width: 43em) {
            padding: 0 50px;
        }
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
`
