import styled from 'styled-components'

export default styled.div`
    > .notifications-container {
        height: 100%;
        overflow: auto;
        border-radius: 10px;
        background-color: #fff;

        .notif-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: ${props => props.theme.contentText};
            font-size: 20px;
            padding: 20px;

            &:nth-of-type(even) {
                background: rgba(246, 249, 252, 0.72);
            }

            .title {
                display: flex;
                align-items: center;
                .notif-circle {
                    margin-right: 20px;
                }
            }
        }
    }
`
