import React from 'react'
import styled from 'styled-components'
import { FaEllipsisH } from 'react-icons/fa'
import Nav from '../components/Nav'
import logo from '../../static/logo-default.png'

const LayoutStyles = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;
    > div {
        width: 100%;
        height: 100vh;
    }
    > ul {
        flex-shrink: 0;
    }
    > div:last-child {
        padding: 10px;
    }
    > .mobile-menu-bar {
        display: none;
        height: 50px;
        padding: 2px 10px;
        background-color: #fff;
        box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.5);
        z-index: 100;
        & > img {
            display: block;
            height: 100%;
        }
    }
    @media screen and (max-width: 43em) {
        flex-direction: column;
        .mobile-menu-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    @media screen and (max-width: 56em) {
        > div:last-child {
            padding: 0;
            & > div:last-child {
                border-radius: 0;
            }
        }
    }
`

// eslint-disable-next-line react/prop-types
export default component => {
    return props => (
        <LayoutStyles>
            <div className="mobile-menu-bar">
                <img src={logo} alt="Ratio" />
                <FaEllipsisH className="menu-icon" size={30} />
            </div>
            <Nav />
            {component(props)}
        </LayoutStyles>
    )
}
