import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MenuItem, Grid } from '@material-ui/core'
import { RemoveCircle, AddCircle } from '@material-ui/icons'
import VehiclesStyles, { StyledSwitch } from './styles/VehiclesStyles'
import Table from './Table'
import NewVehicle from './NewVehicle'
import withLayout from '../hoc/withLayout'
import { StyledButton, StyledInput } from '../material-ui'
import { fetchVehicleList, resetVehicle } from '../store/actions/vehicles'
import { getVehicleTypePath, apiEndpoint, fetchData, getAccessToken } from '../utils'
import truck from '../../static/dump-truck.png'
import excavator from '../../static/excavator.png'

const Vehicles = () => {
    const vehicleList = useSelector(state => state.vehicles.vehicleList)
    const vehiclesLoading = useSelector(state => state.vehicles.loading)
    const dispatch = useDispatch()
    const history = useHistory()

    const [showNewVehicle, setShowNewVehicle] = React.useState(false)
    const [filterType, setFilterType] = React.useState('all')
    const newVehicle = useSelector(state => state.vehicles.newVehicle)
    const vehicleError = useSelector(state => state.vehicles.error)

    const toggleShowNewVehicle = () => {
        setShowNewVehicle(prev => !prev)
    }

    useEffect(() => {
        const filter = filterType !== 'all' ? filterType : false
        dispatch(fetchVehicleList(filter))
    }, [filterType])

    useEffect(() => {
        if (vehicleError) toast.error(vehicleError)
        if (newVehicle) {
            toast.success('Araç Kaydedildi')
            toggleShowNewVehicle()
        }
        dispatch(resetVehicle())
    }, [newVehicle, vehicleError])

    useEffect(() => {}, [filterType])

    const onRowClick = vehicle => {
        const { vehicleTypeId } = vehicle

        history.push({
            pathname: getVehicleTypePath(vehicleTypeId),
            state: { vehicle },
        })
    }

    const onActiveSwitchClick = async (event, id) => {
        event.stopPropagation()
        const response = await fetch(`${apiEndpoint}/vehicle/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ active: event.target.checked }),
            headers: { 'Content-Type': 'application/json', 'ratio-auth': getAccessToken() },
        })
        const parsedResponse = await response.json()
        if (parsedResponse.errors) toast.error('Araç güncellenemedi')
        else toast.success('Araç güncellendi')
    }

    const getIcon = type => {
        switch (type) {
            case 1:
                return truck
            default:
                return excavator
        }
    }

    const tableColumns = [
        {
            key: 'icon',
            title: '',
            dataIndex: 'icon',
            render: row => <img className="vehicle-icon" src={getIcon(row.vehicleTypeId)} alt={`icon-${row.name}`} />,
            cellProps: {
                width: '10%',
            },
        },
        {
            key: 'vehicle-type',
            title: 'Araç Tipi',
            render: row => <span>{row.vehicle_type && row.vehicle_type.name}</span>,
            cellProps: {
                width: '15%',
            },
        },
        {
            key: 'vehicle-model',
            title: 'Model',
            dataIndex: 'manufacturer',
            cellProps: {
                width: '20%',
            },
        },
        {
            key: 'vehicle-plate',
            title: 'Plaka',
            dataIndex: 'plate',
            cellProps: {
                width: '20%',
            },
        },
        {
            key: 'actions',
            title: 'Aktiflik',
            render: row => <StyledSwitch defaultChecked={row.active} onClick={e => onActiveSwitchClick(e, row.id)} />,
            cellProps: {
                width: '20%',
            },
        },
    ]

    return (
        <VehiclesStyles>
            <div className="vehicles-container">
                <Grid className="new-vehicle-container" justify="space-between" alignItems="flex-end" container>
                    <Grid item>
                        <div>
                            <StyledButton
                                variant="outlined"
                                onClick={toggleShowNewVehicle}
                                endIcon={
                                    showNewVehicle ? (
                                        <RemoveCircle classes={{ root: 'remove-icon' }} />
                                    ) : (
                                        <AddCircle classes={{ root: 'add-icon' }} />
                                    )
                                }
                            >
                                Yeni araç {showNewVehicle ? 'gizle' : 'ekle'}
                            </StyledButton>
                            {showNewVehicle && <NewVehicle closeView={toggleShowNewVehicle} />}
                        </div>
                    </Grid>
                    <StyledInput
                        select
                        value={filterType}
                        onChange={e => setFilterType(e.target.value)}
                        margin="dense"
                        variant="outlined"
                        disabled={vehiclesLoading}
                    >
                        <MenuItem key="type-option-all" value="all">
                            Tümü
                        </MenuItem>
                        <MenuItem key="type-option-truck" value={1}>
                            Kamyon
                        </MenuItem>
                        <MenuItem key="type-option-excavator" value={2}>
                            Ekskavatör
                        </MenuItem>
                        <MenuItem key="type-option-drill" value={3}>
                            Drill
                        </MenuItem>
                        <MenuItem key="type-option-loader" value={4}>
                            Loader
                        </MenuItem>
                    </StyledInput>
                </Grid>
                <Table loading={vehiclesLoading} data={vehicleList} columns={tableColumns} onRowClick={onRowClick} />
            </div>
        </VehiclesStyles>
    )
}

export default withLayout(Vehicles)
