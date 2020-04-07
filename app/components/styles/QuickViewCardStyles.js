import styled from 'styled-components'

export default styled.div`
    font-size: 14px;
    display: flex;
    flex-direction: column;

    h3 {
        margin-left: 10px;
        margin-bottom: 10px;
        font-size: 18px;
    }

    img {
        display: block;
        width: 35px;
        border-radius: 50px;
    }

    table {
        margin-bottom: 20px;
    }

    h6 {
        margin-left: 10px;
        margin-bottom: 10px;
    }

    button {
        align-self: center;
    }

    @keyframes gradientBG {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
`
