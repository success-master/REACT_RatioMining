import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import { TableRow, TableCell } from '@material-ui/core'
import { theme } from './Theme'

export const StyledTableRow = withStyles({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: 'rgba(246, 249, 252, 0.72)',
        },
    },
    hover: {
        cursor: 'pointer',
    },
})(TableRow)

export const StyledTableCell = withStyles({
    head: {
        '&:first-child': {
            borderLeft: 'solid 2px #e9ecef',
        },
        '&:last-child': {
            borderRight: 'solid 2px #e9ecef',
        },
        backgroundColor: '#f6f9fc',
        borderTop: 'solid 2px #e9ecef',
        borderBottom: 'solid 2px #e9ecef',
        color: theme.contentText,
        fontWeight: 'bold',
    },
    body: {
        color: theme.contentText,
    },
})(TableCell)

export default styled.div`
    width: 100%;
    overflow-y: auto;
    min-height: 150px;
    background: #fff;
`
