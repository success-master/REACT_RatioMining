import styled from 'styled-components'

export default styled.button`
    height: ${props => (props.type === 'tile' ? '100%' : 'auto')};
    display: ${props => (props.flex ? 'flex' : 'block')};
    flex-direction: ${props => (props.type === 'tile' ? 'column' : 'row')};
    justify-content: ${props => (props.type === 'tile' ? 'flex-start' : 'space-between')};
    align-items: center;
    margin: ${props => (props.centered ? '0 auto' : '0 inherit')};
    padding: 7.5px 17.5px;
    border-radius: ${props => (props.type === 'on-line' ? '50px' : '5px')};
    outline: 0;
    font-size: inherit;
    cursor: pointer;
    transition: transform 0.2s;
    width: ${props => {
        switch (props.type) {
            case 'action':
            case 'tile':
                return '100%'
            default:
                return 'auto'
        }
    }};
    border: ${props => {
        switch (props.type) {
            case 'light':
                return `1px solid ${props.theme.gray}`
            default:
                return 'none'
        }
    }};
    color: ${props => {
        switch (props.type) {
            case 'emphasized':
            case 'accept':
            case 'reject':
            case 'on-line':
                return '#fff'
            default:
                return props.theme.black
        }
    }};
    background-color: ${props => {
        switch (props.type) {
            case 'emphasized':
                return props.theme.accentDark
            case 'accept':
            case 'on-line':
                return props.theme.green
            case 'reject':
                return props.theme.red
            case 'action':
            default:
                return '#fff'
        }
    }};

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        transform: translateY(1px);
    }

    .icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        padding: 7.5px;
        border-radius: 50px;
    }

    > svg {
        stroke: ${props => props.iconColor || props.theme.green};
        fill: ${props => props.iconColor || props.theme.green};
        margin-left: ${props => (props.type === 'tile' ? '0' : '10px')};
        margin-bottom: ${props => (props.type === 'tile' ? '10px' : '0')};
    }

    @media screen and (max-width: 43em) {
        &:hover {
            filter: none;
        }
    }
`
