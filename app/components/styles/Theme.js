import styled, { createGlobalStyle } from 'styled-components'

export const theme = {
    blue: '#1f30a6',
    black: '#393939',
    gray: '#898989',
    green: '#4caf50',
    yellow: '#ffeb00',
    red: '#e51a1a',
    teal: '#009688',
    orange: '#ff7043',
    purple: '#5e6de8',
    magenta: '#FF00FF',
    lightgreen: '#81c784',
    darkgreen: '#43A047',
    lightgray: '#e1e1e1',
    accentLight: '#91ddf9',
    accentMedium: '#0daae4',
    accentDark: '#065674',
    accentDarkTransparent: 'rgba(6, 86, 116, 0.8)',
    contentText: '#32325d',
    blackTransparent: 'rgba(57, 57, 57, 0.4)',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
    bsDark: '0 9px 18px 0 rgba(0, 0, 0, 0.19)',
}

export const StyledPage = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(to right bottom, ${theme.accentDark} 0%, ${theme.accentMedium} 80%);
    background-repeat: no-repeat;
    background-size: 100% 33%;
`

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        padding: 0;
        margin: 0;
        box-sizing: inherit;
    }
    body {
        font-family: 'Open Sans', sans-serif;
        box-sizing: border-box;
        font-weight: 400;
        color: ${theme.black}
        a {
            text-decoration: none;
            color: ${theme.black};
        }
    }

    .gmnoprint,
    .gm-style-cc {
        display: none;
    }

    @media screen and (max-width: 50em) {
        html {
            font-size: 80%;
        }
    }
    #menu-regionTypeId{
        z-index:10000 !important;
    }
`
