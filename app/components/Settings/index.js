import React, { useEffect } from 'react'
import { AddCircle, RemoveCircle,Refresh } from '@material-ui/icons'
import { Grid, MenuItem } from '@material-ui/core'
import withLayout from '../../hoc/withLayout'
import { StyledButton, StyledCard, StyledInput } from '../../material-ui'
import NewPersonnelType from './NewPersonnelType'
import NewShiftType from './NewShiftType'
import NewVehicleType from './NewVehicleType'
import DrillParameters from './DrillParameters'
import TruckParameters from './TruckParameters'
import ExcavatorParameters from './ExcavatorParameters'
import Emails from './Emails'
import NotificationSettings from './NotificationSettings'
import SettingsStyles from '../styles/SettingsStyles'
import { fetchData, apiEndpoint } from '../../utils';
import EditVehicleParameters from './EditVehicleParameters';

const Settings = () => {

    const [parentTypes,setParentTypes] = React.useState([]);
    const [refresh,setRefresh] = React.useState(0);
    useEffect(() => {
        (async function(){
            setParentTypes(await fetchData('/vehicletype?parent=null'));
        })();
    }, []);

    return (
        <SettingsStyles>
            <p className="page-title">Ayarlar</p>
            <StyledCard className="setting-section">
                <p className="section-title">Tip Ayarları</p>
                <NewPersonnelType />
                <NewShiftType />
                <NewVehicleType />
            </StyledCard>

            <StyledCard className="setting-section">
                <p className="section-title">Parametre Ayarları
                <StyledButton style={{float:"right",marginTop:0}} variant="outlined" color="primary" onClick={() => {setRefresh(refresh+1)}}>
                    <Refresh />
                </StyledButton>
                </p>
                {parentTypes.sort((a,b)=>a.id-b.id).map(p=>(
                    <EditVehicleParameters parent={p} needRefresh={refresh}/>
                ))}
            </StyledCard>

            <StyledCard className="setting-section">
                <Emails />
            </StyledCard>

            <StyledCard className="setting-section">
                <p className="section-title">Bildirim Ayaları</p>

                <NotificationSettings />
            </StyledCard>
        </SettingsStyles>
    )
}

export default withLayout(Settings)
