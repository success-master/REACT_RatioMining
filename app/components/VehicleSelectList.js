import React from 'react'
import PropTypes from 'prop-types'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination,
    LinearProgress,
} from '@material-ui/core'
import { toast, Bounce } from 'react-toastify'
import PaginationActions from './PaginationActions'
import { StyledCheckbox, TableRowPlaceholder, StyledButton } from '../material-ui'
import ListStyles from './styles/VehicleSelectListStyles'
import { apiEndpoint, getAccessToken } from '../utils'
import 'react-toastify/dist/ReactToastify.min.css'

// row placeholder
const TableRowsPlaceholder = () => (
    <>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => (
            <TableRowPlaceholder role="checkbox" key={index} selected={false}>
                <TableCell padding="checkbox">
                    <StyledCheckbox disabled/>
                </TableCell>
                <TableCell>
                    <LinearProgress/>
                </TableCell>
                <TableCell>
                    <LinearProgress/>
                </TableCell>
                <TableCell>
                    <LinearProgress/>
                </TableCell>
            </TableRowPlaceholder>
        ))}
    </>
)

// vehicle select list component
const VehicleSelectList = ({ type, selected, confirmed, maxSelection }) => {
    const [vehicleList, setVehicleList] = React.useState([])
    const [selectedList, setSelectedList] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [page, setPage] = React.useState(0)

    const getVehicleTypeId = () => {
        switch (type) {
            case 'truck':
                return 1
            case 'excavator':
                return 2
            case 'loader':
                return 4
        }
    }


    React.useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const response = await fetch(`${apiEndpoint}/vehicle?vehicleTypeId=${getVehicleTypeId(type)}`, {
                headers: {
                    'ratio-auth': getAccessToken(),
                },
            })
            const data = await response.json()

            setVehicleList(data)
            setSelectedList(selected)
            setLoading(false)
        }

        fetchData()
    }, [type])

    // handle selection
    const updateSelectedList = vehicle => {
        // check maximum selected item count
        if (maxSelection > 0 && selectedList.length >= 2 && !selectedList.some(v => v.id === vehicle.id)) {
            if (!toast.isActive('maxSelectionError'))
                toast.error('En fazla iki adet araç seçebilirsiniz!', {
                    toastId: 'maxSelectionError',
                    transition: Bounce,
                })
            return
        }

        const list = selectedList.some(v => v.id === vehicle.id)
            ? selectedList.filter(v => v.id !== vehicle.id)
            : selectedList.concat({ ...vehicle })
        setSelectedList(list)
    }

    // handle page change
    const handlePageChange = (_, newPage) => setPage(newPage)

    return (
        <ListStyles>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>Marka / Model</TableCell>
                        <TableCell>Plaka</TableCell>
                        <TableCell>Yıl</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRowsPlaceholder/>
                    ) : (
                        vehicleList.slice(page * 10, page * 10 + 10).map(vehicle => {
                            const isSelected = selectedList.some(v => v.id === vehicle.id)
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    key={vehicle.id}
                                    selected={isSelected}
                                    onClick={() => updateSelectedList(vehicle)}
                                >
                                    <TableCell padding="checkbox">
                                        <StyledCheckbox checked={isSelected}/>
                                    </TableCell>
                                    <TableCell>{`${vehicle.manufacturer} ${vehicle.kind}`}</TableCell>
                                    <TableCell>{vehicle.plate}</TableCell>
                                    <TableCell>{vehicle.year}</TableCell>
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={vehicleList.length}
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
            <StyledButton variant="contained" color="primary" disabled={loading}
                          onClick={() => confirmed(selectedList)}>
                Sakla
            </StyledButton>
        </ListStyles>
    )
}

// prop type validation
VehicleSelectList.propTypes = {
    type: PropTypes.oneOf(['excavator', 'truck','loader']).isRequired,
    confirmed: PropTypes.func.isRequired,
    selected: PropTypes.arrayOf(PropTypes.object),
    maxSelection: PropTypes.number,
}

VehicleSelectList.defaultProps = {
    selected: [],
    maxSelection: 0,
}

export default VehicleSelectList
