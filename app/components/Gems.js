import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination,
    LinearProgress,
} from '@material-ui/core'
import { AddCircleRounded, RemoveCircleRounded, Settings, BarChart, Delete } from '@material-ui/icons'
import { ToggleButtonGroup } from '@material-ui/lab'
import {
    StyledButton,
    StyledToggleButton,
    StyledInput,
    TableRowPlaceholder,
    StyledFab,
    StyledCheckbox,
} from '../material-ui'
import PaginationActions from './PaginationActions'
import newGemOpReducer, { initialState } from '../hooks/newGemOpReducer'
import GemStyles from './styles/GemsStyles'
import RegionSelection from './RegionSelection'
import Popup from '../hoc/Popup'
import VehicleList from './VehicleSelectList'
import withLayout from '../hoc/withLayout'
import { apiEndpoint, getAccessToken } from '../utils'
import { toast } from 'react-toastify'

// row placeholder
const TableRowsPlaceholder = () => (
    <>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => (
            <TableRowPlaceholder key={index}>
                <TableCell>
                    <LinearProgress/>
                </TableCell>
                <TableCell>
                    <LinearProgress/>
                </TableCell>
                <TableCell>
                    <StyledButton>-</StyledButton>
                </TableCell>
            </TableRowPlaceholder>
        ))}
    </>
)

const steps = ['Optimizasyon tipi', 'Yükleme bölgesi', 'İş makinesi', 'Kamyon', 'Dökme alanı', 'Hedefler']

const Gems = () => {
    const [stateGem, dispatchGem] = React.useReducer(newGemOpReducer, initialState)
    const history = useHistory()

    const requestData = {
        cevher: { list: [] },
        destinations: { list: [] },
        stock: { list: [] },
        id_excavators: { list: [] },
        num_excavators: { list: [] },
        num_loaders: { list: [] },
        id_trucks: { list: [] },
        num_trucks: { list: [] },
        id_loaders: { list: [] },
        goal: { list: [] },
        num_types_truck: null,
        num_types_loaders: null,
        num_types_excavators: null,
        num_cevher: null,
        num_stocks: null,
        num_destinations: null,
        stock_binary: null,
        bunker_binary: null,
        loader_at_cevher: null,
        bunker_goal: null,
    }

    React.useEffect(() => {
        if (stateGem.activeTab !== 'chart') return
        dispatchGem({ type: 'toggle_loading' })
        dispatchGem({ type: 'set_charts', payload: { charts: [] } })
        setTimeout(() => {
            dispatchGem({
                type: 'set_charts',
                payload: {
                    charts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => ({
                        index,
                        name: 'Çizelge 1 - Cevher',
                        createdAt: '01.01.2019 13:00',
                    })),
                },
            })
            dispatchGem({ type: 'toggle_loading' })
        }, 2000)
    }, [stateGem.activeTab])

    const setActiveStep = index => dispatchGem({ type: 'set_active_step', payload: { index } })
    const setOperationType = type => dispatchGem({ type: 'operation_type_selected', payload: { type } })
    const onExcavatorSelected = selected => dispatchGem({ type: 'set_excavators', payload: { selected } })
    const onTruckSelected = selected => dispatchGem({ type: 'set_trucks', payload: { selected } })
    const onLoaderSelected = selected => dispatchGem({ type: 'set_loaders', payload: { selected } })
    const setLoadRegion = region => dispatchGem({ type: 'set_region_load', payload: { region } })
    const setDumpRegion = region => dispatchGem({ type: 'set_region_dump', payload: { region } })
    const setSelectedTab = tab => dispatchGem({ type: 'set_active_tab', payload: { tab } })
    const setOperationName = operationName => dispatchGem({ type: 'set_operation_name', payload: { operationName } })
    const setTargetBunker = targetBunker => dispatchGem({ type: 'set_target_bunker', payload: { targetBunker } })
    const setTotalWorkTime = totalWorkTime => dispatchGem({ type: 'set_total_work_time', payload: { totalWorkTime } })
    const setActiveLoadRegion = activeLoad => dispatchGem({ type: 'set_active_load', payload: { activeLoad } })
    const toggleTruckList = () => dispatchGem({ type: 'toggle_truck_list' })
    const toggleLoaderList = () => dispatchGem({ type: 'toggle_loader_list' })
    const toggleExcavatorList = () => dispatchGem({ type: 'toggle_excavator_list' })
    const lockBunkerSection = () => dispatchGem({
        type: 'lock_bunker',
        payload: { lockBunker: !stateGem.lockBunker },
    })

    const getStepContent = index => {
        switch (index) {
            case 0:
                return (
                    <ToggleButtonGroup
                        size="small"
                        value={stateGem.setOperationType}
                        exclusive
                        onChange={(_, selected) => setOperationType(selected)}
                    >
                        <StyledToggleButton key="gem" value="gem">
                            Cevher yönetimi
                        </StyledToggleButton>
                        <StyledToggleButton key="pickling" value="pickling">
                            Dekapaj yönetimi
                        </StyledToggleButton>
                    </ToggleButtonGroup>
                )
            case 1:
                return (
                    <RegionSelection
                        mode="wizard"
                        type={['load', 'stock']}
                        onBack={() => setActiveStep(0)}
                        multiSelect={true}
                        activeLoadRegion={stateGem.activeLoad}
                        setActiveLoadRegion={setActiveLoadRegion}
                        confirmed={regions => {
                            setLoadRegion(regions)
                            setActiveStep(2)
                        }}
                    />
                )
            case 2:
                return (
                    <>
                        <div className="vehicle-container">
                            {stateGem.activeLoad === 1 && stateGem.excavators.map(({ id, manufacturer }) => (
                                <StyledButton
                                    key={id}
                                    variant="outlined"
                                    endIcon={<RemoveCircleRounded color="secondary"
                                                                  classes={{ colorSecondary: 'secondary' }}/>}
                                    onClick={() => dispatchGem({ type: 'remove_excavator', payload: { id } })}
                                >
                                    {manufacturer}
                                </StyledButton>
                            ))}
                            {stateGem.activeLoad === 2 && stateGem.loaders.map(({ id, manufacturer }) => (
                                <StyledButton
                                    key={id}
                                    variant="outlined"
                                    endIcon={<RemoveCircleRounded color="secondary"
                                                                  classes={{ colorSecondary: 'secondary' }}/>}
                                    onClick={() => dispatchGem({ type: 'remove_loader', payload: { id } })}
                                >
                                    {manufacturer}
                                </StyledButton>
                            ))}
                            <StyledButton
                                variant="contained"
                                color="secondary"
                                endIcon={<AddCircleRounded/>}
                                onClick={stateGem.activeLoad === 1 ? toggleExcavatorList : toggleLoaderList}
                            >
                                İş makinesi ekle
                            </StyledButton>
                        </div>
                        <StyledButton onClick={() => setActiveStep(1)}>Geri</StyledButton>
                        <StyledButton
                            variant="contained"
                            color="primary"
                            disabled={stateGem.activeLoad === 1 ? !stateGem.excavators.length : !stateGem.loaders.length}
                            onClick={() => setActiveStep(3)}
                        >
                            İleri
                        </StyledButton>
                    </>
                )
            case 3:
                return (
                    <>
                        <div className="vehicle-container">
                            <p>En az {stateGem.regionLoad.length} adet kamyon seçmelisiniz</p>
                            {stateGem.trucks.map(({ id, manufacturer }) => (
                                <StyledButton
                                    key={id}
                                    variant="outlined"
                                    endIcon={<RemoveCircleRounded color="secondary"
                                                                  classes={{ colorSecondary: 'secondary' }}/>}
                                    onClick={() => dispatchGem({ type: 'remove_truck', payload: { id } })}
                                >
                                    {manufacturer}
                                </StyledButton>
                            ))}
                            <StyledButton
                                variant="contained"
                                color="secondary"
                                endIcon={<AddCircleRounded/>}
                                onClick={() => dispatchGem({ type: 'toggle_truck_list' })}
                            >
                                Kamyon ekle
                            </StyledButton>
                        </div>
                        <StyledButton onClick={() => setActiveStep(2)}>Geri</StyledButton>
                        <StyledButton
                            variant="contained"
                            color="primary"
                            disabled={stateGem.trucks.length < stateGem.regionLoad.length}
                            onClick={() => setActiveStep(4)}
                        >
                            İleri
                        </StyledButton>
                    </>
                )
            case 4:
                return (
                    <RegionSelection
                        mode="wizard"
                        type={['dump']}
                        onBack={() => setActiveStep(3)}
                        activeLoadRegion={stateGem.activeLoad}
                        setActiveLoadRegion={null}
                        confirmed={regions => {
                            setDumpRegion(regions)
                            setActiveStep(5)
                        }}
                    />
                )
            case 5:
                return (
                    <>
                        <div className="card-container">
                            
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h4">
                                        Bunker
                                    </Typography>
                                    <StyledInput
                                        id="targetTonBunker"
                                        name="targetTonBunker"
                                        label="Hedef Cevher Oranı"
                                        margin="dense"
                                        variant="outlined"
                                        disabled={stateGem.lockBunker}
                                        onChange={targetBunker => setTargetBunker(targetBunker.target.value)}
                                        fullWidth
                                    />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h4">
                                        Toplam Çalışma Saati
                                    </Typography>
                                    <StyledInput
                                        id="totalWorkTime"
                                        name="totalWorkTime"
                                        label="Toplam Çalışma Saati"
                                        margin="dense"
                                        variant="outlined"
                                        onChange={totalWorkTime => setTotalWorkTime(totalWorkTime.target.value)}
                                        fullWidth
                                    />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h4">
                                        Stoğa Çalış
                                    </Typography>
                                    <StyledCheckbox onClick={lockBunkerSection}/>
                                </CardContent>
                            </Card>


                        </div>
                        <StyledButton onClick={() => setActiveStep(4)}>Geri</StyledButton>
                        <StyledButton
                            variant="contained"
                            color="primary"
                            disabled={validateForm()}
                            onClick={saveOperation}
                        >
                            Hesapla
                        </StyledButton>
                    </>
                )
            default:
                break
        }
    }

    const prepareDataBeforeSend = async () => {

        requestData.cevher.list = [1, 2]
        requestData.num_cevher = 2
        requestData.destinations.list = [1, 2, 3, 4]
        requestData.num_destinations = 4

        requestData.stock.list = [1, 2, 3]
        requestData.num_stocks = 3

        requestData.id_excavators.list = [1, 2]

        requestData.num_types_excavators = 1
        requestData.num_excavators.list = [2]

        requestData.id_loaders.list = [1, 2, 3]
        requestData.num_types_loaders = 2
        requestData.num_loaders.list = [3, 3]

        requestData.id_trucks.list = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]]

        requestData.num_trucks.list = [18]
        requestData.num_types_truck = 1

        requestData.stock_binary = 1
        requestData.bunker_binary = 0
        requestData.loader_at_cevher = 0
        requestData.bunker_goal = 32.5
        requestData.goal.list = [32.5, 30, 35, 40]
    }

    async function saveOperation() {
        await prepareDataBeforeSend()

        await Object.keys(requestData).reduce((prev, cur) => {
            prev[cur] = JSON.stringify(prev[cur])
            return prev
        }, requestData)

        const response = await fetch(`${apiEndpoint}/optimize`, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'ratio-auth': getAccessToken(),
            },
        })

        const parsedResponse = response.json()

        if (parsedResponse) toast.error('Oluşturulamadı')
        else {
            toast.success('Cevher optimiasyonu oluşturuldu')
        }
    }

    const validateForm = () => {
        return stateGem.lockBunker ? !stateGem.trucks.length || stateGem.operationName.length < 3 || !stateGem.totalWorkTime : !stateGem.trucks.length || stateGem.operationName.length < 3 || !stateGem.targetBunker || !stateGem.totalWorkTime
    }


    return (
        <GemStyles>
           
           
            <ToggleButtonGroup
                value={stateGem.activeTab}
                exclusive
                onChange={(_, selected) => setSelectedTab(selected)}
                className="wide-container"
            >
                <StyledToggleButton key="opt" value="opt" className="wide">
                    <Settings/>
                    Optimizasyon
                </StyledToggleButton>
                <StyledToggleButton key="chart" value="chart" className="wide">
                    <BarChart/>
                    Çizelge
                </StyledToggleButton>
            </ToggleButtonGroup>

            <StyledInput
                id="operationName"
                name="operationName"
                label="Senaryo İsmi"
                margin="dense"
                variant="outlined"
                required={true}
                onChange={operationName => setOperationName(operationName.target.value)}

            />
            
            


            {stateGem.activeTab === 'opt' && ( 
                <Stepper activeStep={stateGem.activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>{getStepContent(index)}</StepContent>
                        </Step>
                    ))}
                </Stepper>
            )}
            {stateGem.activeTab === 'chart' && (
                <Table size="small" style={{ backgroundColor: '#fff' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Çizelge İsmi</TableCell>
                            <TableCell>Oluşturma Tarihi</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stateGem.loading ? (
                            <TableRowsPlaceholder/>
                        ) : (
                            stateGem.charts.slice(stateGem.page * 10, stateGem.page * 10 + 10).map(chart => {
                                return (
                                    <TableRow hover key={chart.index} onClick={() => history.push('/gemchart')}>
                                        <TableCell>{chart.name}</TableCell>
                                        <TableCell>{chart.createdAt}</TableCell>
                                        <TableCell>
                                            <StyledFab size="small" variant="extended" color="secondary">
                                                <Delete/>
                                                Sil
                                            </StyledFab>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={stateGem.charts.length}
                                page={stateGem.page}
                                rowsPerPage={10}
                                rowsPerPageOptions={[]}
                                onChangePage={(_, newPage) => dispatchGem({ type: 'set_page', payload: { newPage } })}
                                SelectProps={{ native: true }}
                                ActionsComponent={PaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            )}
            <Popup
                show={stateGem.activeLoad === 1 ? stateGem.showExcavatorList : stateGem.showLoaderList}
                onClose={stateGem.activeLoad === 1 ? toggleExcavatorList : toggleLoaderList}
                title="İş Makinesi Seçin"
            >
                <VehicleList
                    type={stateGem.activeLoad === 1 ? 'excavator' : 'loader'}
                    selected={stateGem.activeLoad === 1 ? stateGem.excavators : stateGem.loaders}
                    confirmed={stateGem.activeLoad === 1 ? onExcavatorSelected : onLoaderSelected}
                />
            </Popup>
            <Popup show={stateGem.showTruckList} onClose={toggleTruckList}
                   title="Kamyon Seçin">
                <VehicleList type="truck" confirmed={onTruckSelected}/>
            </Popup>
        </GemStyles>
    )
}

export default withLayout(Gems)
