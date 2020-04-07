import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaWrench } from 'react-icons/fa'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Tooltip as TooltipMui } from '@material-ui/core'
import { AddCircle, ExpandMore as ExpandMoreIcon, Autorenew as AutorenewIcon } from '@material-ui/icons'
import { StyledButton, StyledCard } from '../material-ui'
import NewVehicleIssue from './NewVehicleIssue'
import Table from './Table'
import withLayout from '../hoc/withLayout'
import Popup from '../hoc/Popup'
import VehicleDetailStyles from './styles/VehicleDetailStyles'
import { apiEndpoint, fetchData, getAccessToken } from '../utils'
import { vehicleSpeedData, driverHistoryCol, vehicleProblemCols } from './DUMMY_CHARTS_DATA'

const DefaultVehicleDetail = () => {
    const location = useLocation()
    const history = useHistory()
    const [vehicle, setVehicle] = useState(location.state.vehicle)
    const [expansionPanelData, setExpansionPanelData] = useState(null)
    const [showNewIssue, setShowNewIssue] = useState(false)
    const [loadingVehicle, setLoadingVehicle] = useState(false)
    const [vehicleProblems, setVehicleProblems] = useState(null)
    const [driverHistory, setDriverHistory] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)

    const onClickNewIssue = e => {
        e.stopPropagation()
        setShowNewIssue(true)
    }

    //GATHER API CALLS IN API FILE
    const fetchVehicle = async () => {
        const { id } = vehicle
        const response = await fetchData(`/vehicle/${id}`)

        setVehicle(response)
    }

    const fetchVehicleProblems = async () => {
        const { id } = vehicle
        const problems = await fetchData(`/vehicleproblem?vehicleId=${id}&sort=-createdAt`)

        setVehicleProblems(problems)
    }

    const fetchLiveData = async () => {
        const { id } = location.state.vehicle
        const vehicleLog = await fetchData(`/vehicleLog/?vehicleId=${id}`)

        if (vehicleLog.errors) toast.error('Anlık Veri alınamadı')
        else {
            const { extra, action } = vehicleLog[0]
            setExpansionPanelData({ ...extra, action })
        }
    }

    const fetchDriverHistory = async () => {
        const { id } = vehicle
        const response = await fetchData(`/vehiclelogDetailed?vehicleId=${id}`)

        setDriverHistory(response)
    }

    const onActivateVehicle = async () => {
        const { id } = vehicle
        setLoadingVehicle(true)
        const response = await fetch(`${apiEndpoint}/vehicle/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ active: !vehicle.active }),
            headers: { 'Content-Type': 'application/json', 'ratio-auth': getAccessToken() },
        })
        const parsedResponse = await response.json()
        if (parsedResponse.errors) toast.error('Araç güncellenemedi')
        else {
            toast.success('Araç güncellendi')
            setVehicle(parsedResponse)
        }

        setLoadingVehicle(false)
    }

    const onDeleteVehicle = async () => {
        setDeleteLoading(true)
        const { id } = vehicle

        const response = await fetch(`${apiEndpoint}/vehicle/${id}`, {
            method: 'DELETE',
            headers: {
                'ratio-auth': getAccessToken(),
            },
        })
        const parsedResponse = await response.json()

        if (parsedResponse.errors) {
            toast.error('Araç Silinemedi')
            setDeleteLoading(false)
        } else {
            toast.success('Araç Silindi')
            history.push('/vehicles')
        }
    }

    const handleCloseDeleteModal = async () => {
        if (!deleteLoading) setDeleteModalVisible(false)
    }

    useEffect(() => {
        fetchVehicleProblems()
        fetchLiveData()
        fetchVehicle()
        fetchDriverHistory()
    }, [])

    return (
        <VehicleDetailStyles>
            <div className="vehicle-detail-container">
                <div className="top-button-container">
                    <StyledButton
                        variant={vehicle.active ? 'outlined' : 'contained'}
                        color={vehicle.active ? 'default' : 'secondary'}
                        className="activate-button"
                        onClick={onActivateVehicle}
                        disabled={loadingVehicle}
                    >
                        {loadingVehicle && <AutorenewIcon className="spin" />}
                        Aracı {vehicle.active ? 'Deaktif' : 'Aktif'} Yap
                    </StyledButton>

                    <StyledButton
                        className="delete-button"
                        variant="outlined"
                        color="secondary"
                        onClick={() => setDeleteModalVisible(true)}
                    >
                        Aracı Sil
                    </StyledButton>
                </div>

                <ExpansionPanel disabled={!expansionPanelData}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <p className="chart-title">Anlık Veri</p>
                    </ExpansionPanelSummary>

                    {expansionPanelData && (
                        <ExpansionPanelDetails>
                            <Grid className="live-content-table" container>
                                <Grid className="content-cell" item xs={4}>
                                    <span className="content-title">Sürücü:</span>
                                    <span>{`${expansionPanelData.staff}`}</span>
                                </Grid>
                                <Grid className="content-cell" item xs={3}>
                                    <span className="content-title">Hız:</span>
                                    <span>{`${expansionPanelData.speed} Km/s`}</span>
                                </Grid>
                                <Grid className="content-cell" item xs={3}>
                                    <span className="content-title">Günlük Alınan Yol:</span>
                                    <span>0 Km</span>
                                </Grid>
                                <Grid className="content-cell" item xs={2}>
                                    <FaWrench />
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    )}
                </ExpansionPanel>

                <p className="title">Araç Metrikleri </p>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <StyledCard className="chart-card">
                            <p className="chart-title">Kat Edilen Yol</p>
                            <ResponsiveContainer height={300}>
                                <LineChart data={vehicleSpeedData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ stroke: '#666666', strokeWidth: 1 }} />
                                    <YAxis yAxisId="left" unit=" Km" width={70} />
                                    <Tooltip />
                                    <Line yAxisId="left" type="monotone" dataKey="value" stroke="#707070" strokeWidth="3" />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="chart-footer-row">
                                <div className="footer-item">
                                    <span className="info-title">Toplam Kat Edilen Yol:</span>
                                    <span>23 Km</span>
                                </div>
                            </div>
                        </StyledCard>
                    </Grid>

                    <Grid item xs={12}>
                        <StyledCard className="chart-card">
                            <p className="chart-title">Yakıt Tüketimi</p>
                            <ResponsiveContainer height={300}>
                                <LineChart data={vehicleSpeedData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ stroke: '#666666', strokeWidth: 1 }} />
                                    <YAxis yAxisId="left" unit=" Lt" width={70} />
                                    <Tooltip />
                                    <Line yAxisId="left" type="monotone" dataKey="value" stroke="#707070" strokeWidth="3" />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="chart-footer-row">
                                <div className="footer-item">
                                    <span className="info-title">Ortalama Yakıt Tüketimi:</span>
                                    <span>20 Lt</span>
                                </div>
                                <div className="footer-item">
                                    <span className="info-title">Delik Başına Ortalama Yakıt Tüketimi:</span>
                                    <span>15 Lt</span>
                                </div>
                            </div>
                        </StyledCard>
                    </Grid>

                    <Grid item xs={12}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <p className="chart-title">Sürücü Geçmişi</p>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Table columns={driverHistoryCol} data={driverHistory || []} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>

                    <Grid item xs={12}>
                        <ExpansionPanel disabled={!driverHistory}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <p className="chart-title">Araç Arıza Geçmişi</p>
                                <StyledButton
                                    className="new-issue-button"
                                    variant="outlined"
                                    onClick={onClickNewIssue}
                                    endIcon={<AddCircle classes={{ root: 'add-icon' }} />}
                                >
                                    Arıza Kaydı Ekle
                                </StyledButton>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Table columns={vehicleProblemCols} data={vehicleProblems} loading={!vehicleProblems} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                </Grid>

                <div className="button-container">
                    <StyledButton variant="contained" color="secondary">
                        Excel Tablosu Oluştur
                    </StyledButton>
                </div>
            </div>
            <Popup title="Arıza Kaydı" show={showNewIssue} onClose={() => setShowNewIssue(false)}>
                <NewVehicleIssue closeView={() => setShowNewIssue(false)} vehicleId={vehicle.id} reFetchList={fetchVehicleProblems} />
            </Popup>
            <Popup title="Bu aracı silmek istediğinizden emin misiniz?" show={deleteModalVisible} onClose={handleCloseDeleteModal}>
                <div className="modal-button-container">
                    <StyledButton variant="outlined" onClick={handleCloseDeleteModal} disabled={deleteLoading}>
                        İptal
                    </StyledButton>
                    <StyledButton variant="outlined" color="secondary" onClick={onDeleteVehicle} disabled={deleteLoading}>
                        {deleteLoading && <AutorenewIcon className="spin" />}
                        Aracı Sil
                    </StyledButton>
                </div>
            </Popup>
        </VehicleDetailStyles>
    )
}

export default withLayout(DefaultVehicleDetail)
