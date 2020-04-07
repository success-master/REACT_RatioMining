import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'

const AnimationStyles = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 800;
    .popup-enter {
        opacity: 0;
    }
    .popup-enter-active {
        opacity: 1;
        transition: opacity 300ms;
    }
    .popup-exit {
        opacity: 1;
    }
    .popup-exit-active {
        opacity: 0;
        transition: opacity 300ms;
    }
`

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.65);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 800;
`

const PopupStyles = styled.div`
    min-width: 600px;
    border: 1px solid ${props => props.theme.lightgray};
    border-radius: 5px;
    box-shadow: ${props => props.theme.bs};
    background-color: #fff;
    padding-bottom: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 900;

    .header {
        display: flex;
        justify-content: space-between;
        padding: 10px;

        .button-close {
            border: none;
            outline: none;
            background: transparent;
            transition: all 0.2s;
            &:hover {
                transform: scale(1.1);
            }
            &:active {
                transform: translateY(1px);
            }
        }
    }
`

const Popup = ({ show, title, onClose, children }) => (
    <AnimationStyles show={show}>
        <CSSTransition in={show} timeout={300} classNames="popup" unmountOnExit>
            <div>
                <Backdrop onClick={onClose} />
                <PopupStyles>
                    <div className="header">
                        <h3>{title}</h3>
                        <button type="button" className="button-close" onClick={onClose}>
                            <FaTimes size={30} />
                        </button>
                    </div>
                    {children}
                </PopupStyles>
            </div>
        </CSSTransition>
    </AnimationStyles>
)

Popup.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
}

Popup.defaultProps = {
    title: '',
}

export default Popup
