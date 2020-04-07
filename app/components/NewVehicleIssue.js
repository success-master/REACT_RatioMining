import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { Autorenew as AutorenewIcon } from '@material-ui/icons'
import { StyledButton, StyledInput } from '../material-ui'
import { apiEndpoint, getAccessToken } from '../utils'
import NewVehicleIssueStyles from './styles/NewVehicleIssueStyles'

const NewVehicleIssue = ({ closeView, vehicleId, reFetchList }) => {
    const [form, setForm] = useState({ vehicleId, description: '', date: new Date() })
    const [validForm, setValidForm] = useState({ description: false, occurancedate: true })
    const [formStatus, setFormStatus] = useState(false)
    const [loading, setLoading] = useState(false)

    const updateFormState = e => {
        e.persist()
        setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
        setValidForm(prevState => ({ ...prevState, [e.target.name]: e.target.value !== '' }))
    }
    const updateFormDate = date => {
        setForm(prevState => ({ ...prevState, occurancedate: date }))
        setValidForm(prevState => ({ ...prevState, occurancedate: !isNaN(date) }))
    }

    useEffect(
        () =>
            setFormStatus(
                Object.keys(validForm).every(key => {
                    return validForm[key] === true
                })
            ),
        [validForm]
    )

    const onSubmitForm = async () => {
        setLoading(true)
        const response = await fetch(`${apiEndpoint}/vehicleproblem`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                'ratio-auth': getAccessToken(),
            },
        })
        const parsedResponse = await response.json()
        if (parsedResponse.errors) toast.error('Arıza kaydı oluşturulamadı!')
        else toast.success('Arıza kaydı oluşturuldu')

        if (reFetchList) await reFetchList()
        setLoading(false)
    }

    return (
        <NewVehicleIssueStyles>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className="date-picker"
                    margin="dense"
                    //id="historyDateBegin"
                    label="Başlangıç tarihi"
                    format="dd/MM/yyyy"
                    value={form.occurancedate}
                    onChange={date => updateFormDate(date)}
                    error={!validForm.occurancedate}
                />
            </MuiPickersUtilsProvider>
            <StyledInput
                id="description"
                name="description"
                label="Açıklama"
                variant="outlined"
                fullWidth
                onChange={updateFormState}
                error={!validForm.description}
            />
            <div className="button-container">
                <StyledButton variant="outlined" onClick={closeView}>
                    İPTAL ET
                </StyledButton>
                <StyledButton variant="contained" color="secondary" onClick={onSubmitForm} disabled={!formStatus || loading}>
                    {loading && <AutorenewIcon className="spin" />}
                    KAYDET
                </StyledButton>
            </div>
        </NewVehicleIssueStyles>
    )
}

NewVehicleIssue.propTypes = {
    closeView: PropTypes.func.isRequired,
    vehicleId: PropTypes.number.isRequired,
}

export default NewVehicleIssue
