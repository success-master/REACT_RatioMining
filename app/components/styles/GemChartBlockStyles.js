import styled from 'styled-components'

export default styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    border: 1px solid ${props => props.theme.gray}; 
    font-size: 0.8rem;
    > div {
        background-color: #fff;
    }
    > .full-height {
        grid-row: 1 / 5;
        display: flex;
        flex-direction: column;
    }
    
    .title {
        font-size: 0.9rem!important;
        text-align: center;
        font-weight:bold;
        border: 1px solid ${props => props.theme.gray}; 
    }

    
    .cell {
        height: 100%;
        border: 1px solid ${props => props.theme.gray}; 
        padding: 5px;
        img {
            display: block;
            height: 40px;
        } 
    } 

    .cell--horizontal,
    .cell--vertical {
        display: flex;
    } 

    .cell--horizontal {
        justify-content: space-evenly;
        align-items: center;
    } 

    .cell--vertical {
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
    } 
`
