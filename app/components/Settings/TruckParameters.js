import React, { useEffect, useState } from 'react'
import { Grid, InputAdornment, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, Autorenew as AutorenewIcon } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { StyledButton, StyledInput } from '../../material-ui'
import ParameterStyles from '../styles/ParameterStyles'
import { fetchData, apiEndpoint, getAccessToken } from '../../utils'

const TruckParameters = () => {
    const [expanded, setExpanded] = useState(false)

    const [truck1Form, setTruck1Form] = useState({
        rules: { capacity: '', reffuel: '', refcarryloadspeed: '' },
    })
    const [truck2Form, setTruck2Form] = useState({
        rules: { capacity: '', reffuel: '', refcarryloadspeed: '' },
    })
    const [loading, setLoading] = useState(true)

    const fetchTruckType = async (url, setState) => {
        const data = await fetchData(url)
        const { id } = data[0]
        const { properties } = data[0]
        setState(prevState => ({ ...prevState, id, type: properties.type, rules: properties.rules }))
    }

    useEffect(() => {
        async function cdm() {
            await Promise.all([
                fetchTruckType('/vehicletype?name="Truck Type 1"', setTruck1Form),
                fetchTruckType('/vehicletype?name="Truck Type 2"', setTruck2Form),
            ])
            setLoading(false)
        }
        cdm()
    }, [])

    const updateTruck1Form = e => {
        e.persist()
        setTruck1Form(prevState => ({ ...prevState, rules: { ...prevState.rules, [e.target.name]: e.target.value } }))
    }
    const updateTruck2Form = e => {
        e.persist()
        setTruck2Form(prevState => ({ ...prevState, rules: { ...prevState.rules, [e.target.name]: e.target.value } }))
    }

    const putTruck1 = async () => {
        const { id, type, rules } = truck1Form
        const response = await fetch(`${apiEndpoint}/vehicletype/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ properties: { type, rules } }),
            headers: {
                'Content-Type': 'application/json',
                'ratio-auth': getAccessToken(),
            },
        })
        return response
    }
    const putTruck2 = async () => {
        const { id, type, rules } = truck2Form
        const response = await fetch(`${apiEndpoint}/vehicletype/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ properties: { type, rules } }),
            headers: {
                'Content-Type': 'application/json',
                'ratio-auth': getAccessToken(),
            },
        })
        return response
    }

    const onSubmit = async () => {
        setLoading(true)
        const responses = await Promise.all([putTruck1(), putTruck2()])
        const bodies = await Promise.all(responses.map(async response => await response.json()))
        const success = bodies.every(body => {
            return !body.errors
        })
        if (success) toast.success('Güncellendi')
        else toast.error('Güncellenirken bir hata oluştu')
        setLoading(false)
    }

    return (
        <ParameterStyles>
            <ExpansionPanel expanded={expanded} onChange={() => setExpanded(prevState => !prevState)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <p className="expansion-title">Kamyon Parametreleri</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={2}>
                        <Grid item container xs={12} md={6}>
                            <p className="type-name">Tip 1:</p>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span>Depo Kapasitesi:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="capacity"
                                        value={truck1Form.rules.capacity}
                                        onChange={updateTruck1Form}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={loading}
                                        type="number"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment className="long-andornment" position="end">
                                                    Lt
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span>Referans Yakıt Verimi:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="reffuel"
                                        value={truck1Form.rules.reffuel}
                                        onChange={updateTruck1Form}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={loading}
                                        type="number"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment className="long-andornment" position="end">
                                                    X Lt/Km
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span>Referans Ortalama Hız:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="refcarryloadspeed"
                                        value={truck1Form.rules.refcarryloadspeed}
                                        onChange={updateTruck1Form}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={loading}
                                        type="number"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment className="long-andornment" position="end">
                                                    Km/h
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} md={6}>
                            <p className="type-name">Tip 2:</p>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span>Depo Kapasitesi:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="capacity"
                                        value={truck2Form.rules.capacity}
                                        onChange={updateTruck2Form}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={loading}
                                        type="number"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment className="long-andornment" position="end">
                                                    Lt
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span>Referans Yakıt Verimi:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="reffuel"
                                        value={truck2Form.rules.reffuel}
                                        onChange={updateTruck2Form}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={loading}
                                        type="number"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment className="long-andornment" position="end">
                                                    X Lt/Km
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span>Referans Ortalama Hız:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="refcarryloadspeed"
                                        value={truck2Form.rules.refcarryloadspeed}
                                        onChange={updateTruck2Form}
                                        margin="dense"
                                        variant="outlined"
                                        disabled={loading}
                                        type="number"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment className="long-andornment" position="end">
                                                    Km/h
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className="buttons-container">
                        <StyledButton variant="outlined" onClick={() => setExpanded(false)}>
                            İptal
                        </StyledButton>
                        <StyledButton variant="contained" color="secondary" onClick={onSubmit} disabled={loading}>
                            {loading && <AutorenewIcon className="spin" />}
                            Kaydet
                        </StyledButton>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </ParameterStyles>
    )
}

export default TruckParameters
