import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableRow, TableFooter, TablePagination, LinearProgress } from '@material-ui/core'
import PaginationActions from './PaginationActions'
import { TableRowPlaceholder } from '../material-ui'
import { apiEndpoint, getAccessToken } from '../utils'

// row placeholder
const TableRowsPlaceholder = () => (
    <>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => (
            <TableRowPlaceholder role="checkbox" key={index} selected={false}>
                <TableCell>
                    <LinearProgress />
                </TableCell>
            </TableRowPlaceholder>
        ))}
    </>
)

const DraftList = ({ onSelect }) => {
    const [draftList, setDraftList] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [page, setPage] = React.useState(0)

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const response = await fetch(`${apiEndpoint}/operation?status=0&sort=-createdAt`, {
                headers: {
                    'ratio-auth': getAccessToken(),
                },
            })
            const data = await response.json()

            setDraftList(data)
            setLoading(false)
        }

        fetchData()
    }, [])

    // handle page change
    const handlePageChange = (_, newPage) => setPage(newPage)

    return (
        <Table size="small">
            <TableBody>
                {loading ? (
                    <TableRowsPlaceholder />
                ) : (
                    draftList.slice(page * 10, page * 10 + 10).map(draft => {
                        return (
                            <TableRow hover key={draft.id} onClick={() => onSelect(draft.id)}>
                                <TableCell>{draft.description}</TableCell>
                            </TableRow>
                        )
                    })
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        count={draftList.length}
                        page={page}
                        rowsPerPage={10}
                        rowsPerPageOptions={[]}
                        onChangePage={handlePageChange}
                        SelectProps={{ native: true }}
                        ActionsComponent={PaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    )
}

DraftList.propTypes = {
    onSelect: PropTypes.func.isRequired,
}

export default DraftList
