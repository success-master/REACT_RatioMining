import React, { useEffect, useState } from 'react'
import { Grid, InputAdornment, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, Autorenew as AutorenewIcon } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { StyledButton, StyledInput } from '../../material-ui'
import ParameterStyles from '../styles/ParameterStyles'
import { fetchData, apiEndpoint, getAccessToken } from '../../utils'

const DrillParameters = () => {
    const [expanded, setExpanded] = useState(false)

    const [drill1Form, setDrill1Form] = useState({
        rules: { capacity: '', refdrilltime: '', maxRPM: '', maxRPMtimelimit: '' },
    })
    const [drill2Form, setDrill2Form] = useState({
        rules: { capacity: '', refdrilltime: '', maxRPM: '', maxRPMtimelimit: '' },
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
                fetchType('/vehicletype?name="Drill Type 1"', setDrill1Form),
                fetchType('/vehicletype?name="Drill Type 2"', setDrill2Form),
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
        const responses = await Promise.all([putForm(drill1Form), putForm(drill2Form)])
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
                    <p className="expansion-title">Delici Parametreleri</p>
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
                                        value={drill1Form.rules.capacity}
                                        onChange={e => updateForm(e, setDrill1Form)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
                                        type="number"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Lt</InputAdornment>,
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span>Referans Delme Süresi:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="refdrilltime"
                                        value={drill1Form.rules.refdrilltime}
                                        onChange={e => updateForm(e, setDrill1Form)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
                                        type="number"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Dk</InputAdornment>,
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <p>Delici Motor Sağlığı</p>
                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span className="form-label">Max Rpm:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="maxRPM"
                                        value={drill1Form.rules.maxRPM}
                                        onChange={e => updateForm(e, setDrill1Form)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span className="form-label">Max Rpm Süre Kısıtı:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="maxRPMtimelimit"
                                        value={drill1Form.rules.maxRPMtimelimit}
                                        onChange={e => updateForm(e, setDrill1Form)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
                                        type="number"
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
                                        value={drill2Form.rules.capacity}
                                        onChange={e => updateForm(e, setDrill2Form)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
                                        type="number"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Lt</InputAdornment>,
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span className="form-label">Referans Delme Süresi:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="refdrilltime"
                                        value={drill2Form.rules.refdrilltime}
                                        onChange={e => updateForm(e, setDrill2Form)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
                                        type="number"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Dk</InputAdornment>,
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <p>Delici Motor Sağlığı</p>
                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span className="form-label">Max Rpm:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="maxRPM"
                                        value={drill2Form.rules.maxRPM}
                                        onChange={e => updateForm(e, setDrill2Form)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
                                        type="number"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                <span className="form-label">Max Rpm Süre Kısıtı:</span>
                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name="maxRPMtimelimit"
                                        value={drill2Form.rules.maxRPMtimelimit}
                                        onChange={e => updateForm(e, setDrill2Form)}
                                        disabled={loading}
                                        margin="dense"
                                        variant="outlined"
                                        type="number"
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

export default DrillParameters
