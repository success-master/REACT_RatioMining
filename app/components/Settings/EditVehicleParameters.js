import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, InputAdornment, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, Autorenew as AutorenewIcon,Delete } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { StyledButton, StyledInput } from '../../material-ui'
import ParameterStyles from '../styles/ParameterStyles'
import { fetchData, apiEndpoint, getAccessToken } from '../../utils'
import {VEHICLE_PARAMETERS,validateType} from './ParameterConfig'

const EditVehicleParameters = ({parent,needRefresh}) => {
    needRefresh = needRefresh || 0;
    const [expanded, setExpanded] = useState(false);
    const [vehicleTypes,setVehicleTypes] = useState([]);

    const [loading, setLoading] = useState(true)
    async function cdm() {
        setVehicleTypes((await fetchData(`/vehicletype?parent=${parent.id}`)).sort((a,b)=>a.id-b.id));
        setLoading(false);
    }
    useEffect(()=>{cdm()}, []);

    function checkValidationAll(){
        return vehicleTypes.find(a=>!validateType(a,parent)) == undefined;
    }

    useEffect(()=>{
        if(needRefresh > 0)
            cdm();
    },[needRefresh]);

    const updateFormState = (id) => {
        if(id == null || id < 0)
            return e=>{};
        return (e)=>{
            e.persist()
            if(typeof e.target.name != "string")
                return;
            setVehicleTypes(prevState=>{
                return prevState.reduce((prev,cur)=>{
                    if(cur.id == id){
                        var name = e.target.name.split(".").reverse();
                        var newObj = Object.assign({},cur);
                        var temp = newObj;
                        while(name.length>1){
                            var p = name.pop();
                            temp[p] = temp[p] || {};
                            temp = temp[p];
                        }
                        temp[name.pop()] = e.target.value;
                        prev.push(newObj);
                    }else
                        prev.push(cur);
                    return prev;
                },[]);
            });
        }
    }
    const save = (vehicleType) => {
        return new Promise(async (res,rej)=>{
            const response = await fetch(`${apiEndpoint}/vehicletype/${vehicleType.id}`, {
                method: 'PUT',
                body: JSON.stringify(vehicleType),
                headers: {
                    'Content-Type': 'application/json',
                    'ratio-auth': getAccessToken(),
                },
            });
            if(response.status>=200 && response.status < 300)
                res();
            else
                rej();
        });
    }

    const remove = (vehicleType) => {
        return new Promise(async (res,rej)=>{
            const response = await fetch(`${apiEndpoint}/vehicletype/${vehicleType.id}`, {
                method: 'DELETE',
                body: "",
                headers: {
                    'Content-Type': 'application/json',
                    'ratio-auth': getAccessToken(),
                },
            });
            await cdm();
            if(response.status>=200 && response.status < 300)
                res();
            else
                rej();
        });
    }

    const onSubmit = () => {
        setLoading(true);
        Promise.all(vehicleTypes.map(v=>save(v))).then(()=>{
            toast.success('Güncellendi');
            setLoading(false);
        }).catch(()=>{
            toast.error('Güncellenirken bir hata oluştu');
            setLoading(false);
        });
    }

    return (
        <ParameterStyles>
            <ExpansionPanel expanded={expanded} onChange={() => setExpanded(prevState => !prevState)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <p className="expansion-title">{parent.name} Parametreleri</p>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container spacing={2}>
                        {vehicleTypes.map(v=>(
                            <Grid item container xs={12} md={6}>
                                
                                <StyledButton style={{padding:"4px 5px", width:"30px",height:"30px",minWidth:"0"}} variant="outlined" color="secondary" onClick={() => remove(v)}>
                                    <Delete style={{fontSize: "20px"}} />
                                </StyledButton>
                                <p className="type-name">{v.name}:</p>
                                {Object.keys(parent.properties.rules).map(p=>(
                                    <Grid item container xs={12} justify="space-between" alignItems="center" spacing={2}>
                                        <span>{VEHICLE_PARAMETERS[p].title}:</span>
                                        <Grid item xs={12} md={6}>
                                            <StyledInput
                                                name={`properties.rules.${p}`}
                                                value={v.properties.rules[p]}
                                                onChange={updateFormState(v.id)}
                                                margin="dense"
                                                variant="outlined"
                                                disabled={loading}
                                                error={!VEHICLE_PARAMETERS[p].validation(v.properties.rules[p])}
                                                type="number"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment className="long-andornment" position="end">
                                                            {VEHICLE_PARAMETERS[p].unit}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                    <div className="buttons-container">
                        <StyledButton variant="outlined" onClick={() => setExpanded(false)}>
                            İptal
                        </StyledButton>
                        <StyledButton variant="contained" color="secondary" onClick={onSubmit} disabled={loading || !vehicleTypes.length || !checkValidationAll()}>
                            {loading && <AutorenewIcon className="spin" />}
                            Kaydet
                        </StyledButton>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </ParameterStyles>
    )
}

EditVehicleParameters.propTypes = {
    parent: PropTypes.object.isRequired,
    needRefresh: PropTypes.number
}

export default EditVehicleParameters
