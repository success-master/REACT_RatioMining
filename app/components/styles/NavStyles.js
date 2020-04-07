import styled from 'styled-components'

export default styled.ul`
    height: 100vh;
    margin: 0;
    padding: 10px ${props => (props.closed ? '10px' : '20px')};
    width: ${props => (props.closed ? '50px' : '250px')};
    background: #fff;
    border-right: 1px solid ${props => props.theme.lightgray};
    box-shadow: ${props => props.theme.bs};
    transition: all 0.3s;
    z-index: 20;

    .logo-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
            opacity: ${props => (props.closed ? 0 : 1)};
            transform: ${props => (props.closed ? 'translateX(-120%)' : 'translateX(0)')};
            display: block;
            height: 30px;
            transition: all 0.3s;
        }
    }

    .nav-button {
        outline: none;
        border: none;
        background-color: transparent;
        height: 50px;
        width: 30px;
        margin-right: ${props => (props.closed ? '0' : '20px')};
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nav-icon {
        position: relative;
    }

    .nav-icon,
    .nav-icon::before,
    .nav-icon::after {
        display: inline-block;
        width: 30px;
        height: 2px;
        background-color: ${props => props.theme.black};
    }

    .nav-icon::before,
    .nav-icon::after {
        content: '';
        position: absolute;
        left: 0;
        transition: all 0.2s;
    }

    .nav-icon::before {
        top: -8px;
    }
    .nav-icon::after {
        top: 8px;
    }

    .nav-button:hover > .nav-icon::before {
        top: -10px;
    }

    .nav-button:hover > .nav-icon::after {
        top: 10px;
    }

    .nav-link-container {
        color: ${props => props.theme.gray};
        display: flex;
        padding: 15px 0;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        opacity: ${props => (props.closed ? 0 : 1)};
        transform: ${props => (props.closed ? 'translateX(-120%)' : 'translateX(0)')};
        transition: all 0.2s;

        &:hover {
            color: ${props => props.theme.accentMedium};
            transform: scale(1.05);
        }
    }

    p {
        color: inherit;
        margin-left: 10px;
        margin-right: auto;
    }
`
