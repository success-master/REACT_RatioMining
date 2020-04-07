import React, { useState } from 'react'
import { Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, MenuItem } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, Autorenew as AutorenewIcon, RemoveCircle, AddCircle } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { StyledButton, StyledInput } from '../../material-ui'
import TypeSettingsStyles, { Circle } from '../styles/TypeSettingsStyles'
import { apiEndpoint, getAccessToken } from '../../utils'
import { theme } from '../styles/Theme'

const NewPersonnelType = () => {
    const [expanded, setExpanded] = useState(false)
    const [personnelType, setPersonnelType] = useState({ name: '', color: theme.red })
    const [loading, setLoading] = useState(false)

    const updateForm = (e, setState) => {
        e.persist()
        setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const onSubmit = async () => {
        const { name, color } = personnelType
        setLoading(true)

        const response = await fetch(`${apiEndpoint}/stafftype`, {
            method: 'POST',
            body: JSON.stringify({ name, extra: { color } }),
            headers: {
                'Content-Type': 'application/json',
                'ratio-auth': getAccessToken(),
            },
        })
        const parsedResponse = response.json()

        if (parsedResponse.errors) toast.error('Personel tipi oluşturulamadı')
        else {
            toast.success('Personel tipi oluşturuldu')
            setPersonnelType(prevState => ({ ...prevState, name: '', color: theme.red }))
        }

        setLoading(false)
    }

    return (
        <TypeSettingsStyles>
            <ExpansionPanel expanded={expanded} onChange={() => setExpanded(prevState => !prevState)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <p className="expansion-title">
                        {expanded ? <RemoveCircle className="remove-icon" /> : <AddCircle className="add-icon" />}
                        Yeni Personel Tipi
                    </p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={2}>
                        <Grid item container xs={12} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <span>Personel Tipi Adı:</span>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <StyledInput
                                    name="name"
                                    value={personnelType.name}
                                    onChange={e => updateForm(e, setPersonnelType)}
                                    error={personnelType.name === ''}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid item container xs={12} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <span>Personel Tipi Rengi:</span>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StyledInput
                                    select
                                    name="color"
                                    value={personnelType.color}
                                    onChange={e => updateForm(e, setPersonnelType)}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                >
                                    <MenuItem key="option-orange" value={theme.orange}>
                                        <Circle fill={theme.orange} />
                                        Turuncu
                                    </MenuItem>
                                    <MenuItem key="option-red" value={theme.red}>
                                        <Circle fill={theme.red} />
                                        Kırmızı
                                    </MenuItem>
                                    <MenuItem key="option-blue" value={theme.accentMedium}>
                                        <Circle fill={theme.accentMedium} />
                                        Turkuaz
                                    </MenuItem>
                                    <MenuItem key="option-green" value={theme.green}>
                                        <Circle fill={theme.green} />
                                        Yeşil
                                    </MenuItem>
                                    <MenuItem key="option-yellow" value={theme.yellow}>
                                        <Circle fill={theme.yellow} />
                                        Sarı
                                    </MenuItem>
                                    <MenuItem key="option-purple" value={theme.purple}>
                                        <Circle fill={theme.purple} />
                                        Mor
                                    </MenuItem>
                                    <MenuItem key="option-lightgray" value={theme.lightgray}>
                                        <Circle fill={theme.lightgray} />
                                        Gri
                                    </MenuItem>
                                    <MenuItem key="option-teal" value={theme.teal}>
                                        <Circle fill={theme.teal} />
                                        Açık Yeşil
                                    </MenuItem>
                                    <MenuItem key="option-magenta" value={theme.magenta}>
                                        <Circle fill={theme.magenta} />
                                        Magenta
                                    </MenuItem>
                                </StyledInput>
                            </Grid>
                        </Grid>
                    </Grid>

                    <div className="buttons-container">
                        <StyledButton variant="outlined" onClick={() => setExpanded(false)}>
                            İptal
                        </StyledButton>
                        <StyledButton
                            variant="contained"
                            color="secondary"
                            onClick={onSubmit}
                            disabled={loading || personnelType.name === ''}
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

export default NewPersonnelType
