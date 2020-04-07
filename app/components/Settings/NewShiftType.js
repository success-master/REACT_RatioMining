import React, { useState } from 'react'
import { Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, MenuItem } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, Autorenew as AutorenewIcon, RemoveCircle, AddCircle } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { StyledButton, StyledInput } from '../../material-ui'
import TypeSettingsStyles, { Circle } from '../styles/TypeSettingsStyles'
import { apiEndpoint, getAccessToken } from '../../utils'
import { theme } from '../styles/Theme'

const NewShiftType = () => {
    const [expanded, setExpanded] = useState(false)
    const [shiftType, setShiftType] = useState({ name: '', starttime: '08:30:00', endtime: '17:30:00' })
    const [validField, setValidField] = useState({ name: false, starttime: true, endtime: true })
    const [loading, setLoading] = useState(false)

    const updateValidField = (name, value) => {
        setValidField(prevState => ({ ...prevState, [name]: value !== '' }))
    }
    const updateForm = (e, setState) => {
        e.persist()
        const { name, value } = e.target
        setState(prevState => ({ ...prevState, [name]: value }))
        updateValidField(name, value)
    }

    const onSubmit = async () => {
        setLoading(true)

        const response = await fetch(`${apiEndpoint}/shifttype`, {
            method: 'POST',
            body: JSON.stringify(shiftType),
            headers: {
                'Content-Type': 'application/json',
                'ratio-auth': getAccessToken(),
            },
        })
        const parsedResponse = await response.json()

        if (parsedResponse.errors) toast.error('Mesai tipi oluşturulamadı')
        else {
            toast.success('Mesai tipi oluşturuldu')
            setShiftType(prevState => ({ ...prevState, name: '', starttime: '08:30:00', endtime: '17:30:00' }))
        }

        setLoading(false)
    }

    return (
        <TypeSettingsStyles>
            <ExpansionPanel expanded={expanded} onChange={() => setExpanded(prevState => !prevState)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <p className="expansion-title">
                        {expanded ? <RemoveCircle className="remove-icon" /> : <AddCircle className="add-icon" />}
                        Yeni Mesai Tipi
                    </p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={2}>
                        <Grid item container xs={12} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <span>Mesai Tipi Adı:</span>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <StyledInput
                                    name="name"
                                    value={shiftType.name}
                                    onChange={e => updateForm(e, setShiftType)}
                                    error={shiftType.name === ''}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid item container xs={12} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <span>Başlangıç Saati:</span>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StyledInput
                                    name="starttime"
                                    value={shiftType.starttime}
                                    onChange={e => updateForm(e, setShiftType)}
                                    error={shiftType.starttime === ''}
                                    margin="dense"
                                    variant="outlined"
                                    placeholder="08:30:00"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid item container xs={12} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <span>Bitiş Saati:</span>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <StyledInput
                                    name="endtime"
                                    value={shiftType.endtime}
                                    onChange={e => updateForm(e, setShiftType)}
                                    error={shiftType.endtime === ''}
                                    margin="dense"
                                    variant="outlined"
                                    placeholder="17:30:00"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <div className="buttons-container">
                        <StyledButton variant="outlined" onClick={() => setExpanded(false)}>
                            İptal
                        </StyledButton>
                        <StyledButton
                            disabled={!(validField.name && validField.starttime && validField.endtime) || loading}
                            variant="contained"
                            color="secondary"
                            onClick={onSubmit}
                        >
                            {loading && <AutorenewIcon className="spin" />}
                            Kaydet
                        </StyledButton>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </TypeSettingsStyles>
    )
}

export default NewShiftType
