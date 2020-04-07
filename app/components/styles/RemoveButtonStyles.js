import styled from 'styled-components'

export default styled.button`
    background-color: #fff;
    border: none;
    border-radius: 10px;
    outline: none;
    color: ${props => props.theme.red};
    position: absolute;
    top: ${props => `-${props.offset}px`};
    right: ${props => `-${props.offset}px`};
    transition: 0.2s;

    &:hover {
        transform: scale(1.2);
    }

    &:active {
        transform: scale(1);
    }
`
