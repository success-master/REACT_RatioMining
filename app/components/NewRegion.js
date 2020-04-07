import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { MenuItem } from '@material-ui/core'
import { CheckCircleOutlineOutlined } from '@material-ui/icons'
import { StyledButton, StyledInput } from '../material-ui'
import { regionTypes } from '../utils'
import Error from './ErrorInline'
import { theme } from './styles/Theme'

const NewRegionStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    > div:first-child {
        margin-bottom: 10px;
    }
    > form {
        display: flex;
        flex-direction: column;
    }
`

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
}))

const NewRegion = ({ onSubmit, newRegion, error }) => {
    const [formState, setFormState] = React.useState({
        regionTypeId: 1,
        name: '',
        properties:{
            gemRatio: '',
            eta: '',
            capacity: '',
            stock: '',
            estimatedGemRatio: '',
            estimatedStockGemRatio: '',
            load: '',
        }
    });

    const classes = useStyles();

    const updateFormState = e => {
        e.persist()
        var name = e.target.name.split(".");
        if(name.length>1){
            setFormState(prevState => {
                var child = Object.assign({},prevState[name[0]],{[name[1]]:e.target.value});
                return Object.assign({},prevState,{[name[0]]:child});
            });
        }else{
            setFormState(prevState => Object.assign({},prevState,{
                [name[0]]: e.target.value
            }));
        }
        return;
    }

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(formState)
    }

    if (newRegion) return <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
        <CheckCircleOutlineOutlined fontSize="large" style={{ color: theme.green, marginRight: '10px' }} />
        {newRegion.name} kaydedildi
    </div>
    return (
        <NewRegionStyles>
            {error && <Error fullwidth message="Bir sorun oluştu!" />}
            <StyledInput
                fullWidth
                select
                name="regionTypeId"
                label="Bölge tipi"
                className={classes.textField}
                margin="dense"
                variant="outlined"
                value={formState.regionTypeId}
                onChange={updateFormState}>
                    {regionTypes.map(({ key, value }) => <MenuItem key={key} value={key}>
                        {value}
                    </MenuItem>)}
            </StyledInput>
            <form method="post" autoComplete="off" onSubmit={handleSubmit}>
                <StyledInput
                    fullWidth
                    name="name"
                    label="Bölge adı"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    value={formState.name}
                    onChange={updateFormState}
                />
                {formState.regionTypeId === 1 && (
                    <StyledInput
                        fullWidth
                        name="properties.gemRatio"
                        type="number"
                        variant="outlined"
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        label="Cevher oranı (%)"
                        className={classes.textField}
                        margin="dense"
                        value={formState.gemRatio}
                        onChange={updateFormState}
                    />
                )}
                {formState.regionTypeId === 2 && (
                    <>
                        <StyledInput
                            fullWidth
                            name="properties.stock"
                            type="number"
                            label="Mevcut stok miktarı (T)"
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            value={formState.properties.stock}
                            onChange={updateFormState}
                        />
                        <StyledInput
                            fullWidth
                            name="properties.estimatedStockGemRatio"
                            type="number"
                            label="Tahmini stok cevher oranı"
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            value={formState.properties.estimatedStockGemRatio}
                            onChange={updateFormState}
                        />
                    </>
                )}
                {formState.regionTypeId === 5 && (
                    <>
                        <StyledInput
                            fullWidth
                            name="properties.eta"
                            type="number"
                            label="Tahmini işlem süresi (saniye/ton)"
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            value={formState.properties.eta}
                            onChange={updateFormState}
                        />
                        <StyledInput
                            fullWidth
                            name="properties.capacity"
                            type="number"
                            label="Toplam kapasite (T)"
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            value={formState.properties.capacity}
                            onChange={updateFormState}
                        />
                        <StyledInput
                            fullWidth
                            name="properties.load"
                            type="number"
                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                            label="Mevcut yük miktarı (T)"
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            value={formState.properties.load}
                            onChange={updateFormState}
                        />
                        <StyledInput
                            fullWidth
                            name="properties.estimatedGemRatio"
                            type="number"
                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                            label="Tahmini cevher oranı (%)"
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            value={formState.properties.estimatedGemRatio}
                            onChange={updateFormState}
                        />
                    </>
                )}
                <input type="submit" hidden />
                <StyledButton variant="contained" color="primary" onClick={handleSubmit}>
                    Sakla
                </StyledButton>
            </form>
        </NewRegionStyles>
    )
}

NewRegion.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    newRegion: PropTypes.shape({
        name: PropTypes.string,
    }),
}

NewRegion.defaultProps = {
    error: '',
    newRegion: {},
}

export default NewRegion
