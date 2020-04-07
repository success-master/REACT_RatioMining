import React, { useState, useEffect } from 'react'
import { Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, MenuItem } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, Autorenew as AutorenewIcon, RemoveCircle, AddCircle } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { StyledButton, StyledInput } from '../../material-ui'
import TypeSettingsStyles from '../styles/TypeSettingsStyles'
import { apiEndpoint, fetchData } from '../../utils'
import {VEHICLE_PARAMETERS,validateType} from './ParameterConfig'

const NewShiftType = () => {
    const [expanded,setExpanded] = useState(false);
    const [mainTypes, setMainTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newType, setNewType] = useState({name:'', parent:'sec', properties:{rules:{}}});
    const updateFormState = e => {
        e.persist()
        if(typeof e.target.name != "string")
            return;
        setNewType(prevState=>{
            var name = e.target.name.split(".").reverse();
            var newObj = Object.assign({},prevState);
            var temp = newObj;
            while(name.length>1){
                var p = name.pop();
                temp[p] = temp[p] || {};
                temp = temp[p];
            }
                
            temp[name.pop()] = e.target.value;
            return newObj;
        });
    }
    const fetchMainTypes = async () => {
        const response = await fetchData('/vehicletype')
        setMainTypes(response)
    }

    useEffect(() => {
        fetchMainTypes()
    }, [])

    const onSubmit = async () => {
        setLoading(true);
        const response = await fetch(`${apiEndpoint}/vehicletype`, {
            method: 'POST',
            body: JSON.stringify({
                name: newType.name,
                parent: newType.parent,
                properties: newType.properties
            }),
            headers: { 'Content-Type': 'application/json','ratio-auth': getAccessToken(), },
        });
        const parsedResponse = await response.json();
        if (parsedResponse.errors) 
            toast.error('Alt tip oluşturulamadı');
        else {
            toast.success('Alt tip oluşturuldu');
            setNewType({name:'', parent:'sec', properties:{rules:{}}});
        }
        setLoading(false);
    }

    return (
        <TypeSettingsStyles>
            <ExpansionPanel expanded={expanded} onChange={() => setExpanded(prevState => !prevState)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <p className="expansion-title">
                        {expanded ? <RemoveCircle className="remove-icon" /> : <AddCircle className="add-icon" />}
                        Yeni Araç Alt Tipi
                    </p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={2}>
                        <Grid item container xs={12} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <span>Araç Alt Tipi Adı:</span>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <StyledInput
                                    name="name"
                                    value={newType.name}
                                    onChange={updateFormState}
                                    error={newType.name === ''}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid item container xs={12} alignItems="center">
                            <Grid item xs={12} md={3}>
                                <span>Araç Tipi:</span>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <StyledInput
                                    select
                                    name="parent"
                                    value={newType.parent}
                                    onChange={updateFormState}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                >
                                    <MenuItem key={`option-parent-types-null`} value={'sec'}>
                                        -- Araç Tipi Seçin --
                                    </MenuItem>
                                    {mainTypes &&
                                        mainTypes.filter(t=>t.parent==null).map(type => (
                                            <MenuItem key={`option-parent-types-${type.id}`} value={type.id}>
                                                {type.name}
                                            </MenuItem>
                                        ))}
                                </StyledInput>
                            </Grid>
                        </Grid>
                        {newType.parent && !isNaN(newType.parent) && Object.keys(mainTypes.find(t=>t.id==newType.parent).properties.rules).map(param =>(
                            
                            <Grid item container xs={12} alignItems="center">
                                <Grid item xs={12} md={3}>
                                    <span>{VEHICLE_PARAMETERS[param].title}</span>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <StyledInput
                                        name={`properties.rules.${param}`}
                                        value={newType.properties.rules[param]}
                                        onChange={updateFormState}
                                        error={!VEHICLE_PARAMETERS[param].validation(newType.properties.rules[param])}
                                        margin="dense"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>

                    <div className="buttons-container">
                        <StyledButton variant="outlined" onClick={() => setExpanded(false)}>
                            İptal
                        </StyledButton>
                        <StyledButton
                            variant="contained"
                            color="secondary"
                            onClick={onSubmit}
                            disabled={!validateType(newType,mainTypes.find(p=>p.id==newType.parent))}
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
