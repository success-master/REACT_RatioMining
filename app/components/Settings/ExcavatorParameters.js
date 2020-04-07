import React, { useEffect, useState } from 'react'
import { Grid, InputAdornment, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, Autorenew as AutorenewIcon } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { StyledButton, StyledInput } from '../../material-ui'
import ParameterStyles from '../styles/ParameterStyles'
import { fetchData, apiEndpoint, getAccessToken } from '../../utils'

const ExcavatorLoaderParameters = () => {
    const [expanded, setExpanded] = useState(false)

    const [excavatorForm, setExcavatorForm] = useState({
        rules: { capacity: '', reffuel: '', refcarryloadspeed: '' },
    })
    const [loaderForm, setLoaderForm] = useState({
        rules: { capacity: '', reffuel: '', refcarryloadspeed: '' },
    })
    const [loading, setLoading] = useState(true)

    const fetchType = async (url, setState) => {
        const data = await fetchData(url)
        const { id } = data[0]
        const { properties } = data[0]
        setState(prevState => ({ ...prevState, id, type: properties.type, rules: properties.rules }))
    }

    useEffect(() => {
        async function cdm() {
            await Promise.all([
                fetchType('/vehicletype?name="Excavator"', setExcavatorForm),
                fetchType('/vehicletype?name="Loader"', setLoaderForm),
            ])
            setLoading(false)
        }
        cdm()
    }, [])

    const updateForm = (e, setState) => {
        e.persist()
        setState(prevState => ({ ...prevState, rules: { ...prevState.rules, [e.target.name]: e.target.value } }))
    }

    const putForm = async form => {
        const { id, rules } = form
        const response = await fetch(`${apiEndpoint}/vehicletype/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ properties: { rules } }),
            headers: {
                'Content-Type': 'application/json',
                'ratio-auth': getAccessToken(),
            },
        })
        return response
    }

    const onSubmit = async () => {
        setLoading(true)
        const responses = await Promise.all([putForm(excavatorForm), putForm(loaderForm)])
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
                    <p className="expansion-title">Excavator - Loader Parametreleri</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={2}>
                        <Grid item container xs={12} md={6}>
                            <p className="type-name">Excavator:</p>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span>Depo Kapasitesi:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="capacity"
                                        value={excavatorForm.rules.capacity}
                                        onChange={e => updateForm(e, setExcavatorForm)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
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
                                        value={excavatorForm.rules.reffuel}
                                        onChange={e => updateForm(e, setExcavatorForm)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
                                        type="number"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment className="long-andornment" position="end">
                                                    A Ton
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span>Referans Yükleme Hızı:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="refloadspeed"
                                        value={excavatorForm.rules.refloadspeed}
                                        onChange={e => updateForm(e, setExcavatorForm)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
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
                            <p className="type-name">Loader:</p>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span>Depo Kapasitesi:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="capacity"
                                        value={loaderForm.rules.capacity}
                                        onChange={e => updateForm(e, setLoaderForm)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
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
                                        value={loaderForm.rules.reffuel}
                                        onChange={e => updateForm(e, setLoaderForm)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
                                        type="number"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment className="long-andornment" position="end">
                                                    A Ton
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span>Referans Yükleme Hızı:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="refloadspeed"
                                        value={loaderForm.rules.refloadspeed}
                                        onChange={e => updateForm(e, setLoaderForm)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
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

export default ExcavatorLoaderParameters
