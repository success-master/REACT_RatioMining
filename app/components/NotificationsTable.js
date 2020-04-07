import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { Table, TableBody, TableCell, TableRow, TableFooter, TablePagination } from '@material-ui/core'
import PaginationActions from './PaginationActions'
import truncate from '../api/string'

const NotificationsTable = () => {
    const [page, setPage] = React.useState(0)
    const { notifications } = useSelector(state => state.notifications)
    const history = useHistory()

    const unreadNotifications = notifications.filter(function(notification) {
        return notification.active == true;
    })

    // handle page change
    const handlePageChange = (_, newPage) => setPage(newPage)

    return (
        <Table size="small">
            <TableBody>
                {unreadNotifications.slice(page * 10, page * 10 + 10).map(({ id, data, updatedAt, type }) => (
                    <TableRow key={`${type}-${id}`} hover onClick={() => history.push("/notifications")}>
                        <TableCell>{data && truncate(data, 50)}</TableCell>
                        <TableCell>{format(new Date(updatedAt), 'MMM d, yyyy hh:mm')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        count={unreadNotifications.length}
                        page={page}
                        rowsPerPage={10}
                        rowsPerPageOptions={[]}
                        onChangePage={handlePageChange}
                        ActionsComponent={PaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default NotificationsTable
