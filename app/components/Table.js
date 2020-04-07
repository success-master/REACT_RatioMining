import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody, TableHead, TableRow, LinearProgress } from '@material-ui/core'
import TableStyles, { StyledTableRow, StyledTableCell } from './styles/TableStyles'
import { TableRowPlaceholder } from '../material-ui'

const TableRowsPlaceholder = ({ columns }) => (
    <>
        {[0, 1, 2, 3, 4].map(index => (
            <TableRowPlaceholder key={`placeholder-row-${index}`}>
                {columns.map((_, cellIndex) => (
                    <StyledTableCell key={`placeholder-cell-${cellIndex}`}>
                        <LinearProgress />
                    </StyledTableCell>
                ))}
            </TableRowPlaceholder>
        ))}
    </>
)

const StyledTable = ({ data, columns, onRowClick, loading, className }) => {
    return (
        <TableStyles className={className}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {columns.map((column, idx) => (
                            <StyledTableCell key={`table-header-${column.key || column.title}-${idx}`} {...column.headerProps}>
                                {column.title}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRowsPlaceholder columns={columns} />
                    ) : (
                        data.map((row, idxR) => (
                            <StyledTableRow
                                key={`table-row-${idxR}`}
                                onClick={() => onRowClick && onRowClick(row)}
                                hover={onRowClick && true}
                            >
                                {columns.map((column, idxC) => (
                                    <StyledTableCell {...column.cellProps} key={`table-cell-${idxR}-${idxC}`}>
                                        {column.render ? column.render(row) : row[column.dataIndex]}
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableStyles>
    )
}

StyledTable.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    onRowClick: PropTypes.func,
    loading: PropTypes.bool,
    className: PropTypes.string,
}
StyledTable.defaultProps = {
    data: [],
    columns: [],
    onRowClick: null,
    loading: false,
    className: '',
}

TableRowsPlaceholder.propTypes = {
    columns: PropTypes.array,
}
TableRowsPlaceholder.defaultProps = {
    columns: [],
}

export default StyledTable
