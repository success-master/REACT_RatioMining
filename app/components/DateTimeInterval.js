import 'date-fns'
import React from 'react'
import PropTypes from 'prop-types'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers'
import styled from 'styled-components'
import Error from './ErrorInline'
import { StyledButton } from '../material-ui'

const Styles = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    .container {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        margin-bottom: 20px;
    }
`

const DateTimeInterval = ({ onSubmit, error }) => {
    const [formState, setFormState] = React.useState({
        dateBegin: null,
        timeBegin: null,
        dateEnd: null,
        timeEnd: null,
        submitEnabled: false,
        showError: false,
    })

    const updateFormState = (date, key) => {
        const newState = {
            ...formState,
            [key]: date,
        }
        const { dateBegin, timeBegin, dateEnd, timeEnd } = newState
        const bAllFilled = dateBegin !== null && timeBegin !== null && dateEnd !== null && timeEnd !== null

        const enabled =
            bAllFilled &&
            new Date(dateBegin).getTime() + new Date(timeBegin).getTime() <= new Date(dateEnd).getTime() + new Date(timeEnd).getTime()

        let invalid = false
        invalid =
            (dateBegin !== null && dateEnd !== null && new Date(dateBegin) > new Date(dateEnd)) ||
            (bAllFilled &&
                new Date(dateBegin).getTime() + new Date(timeBegin).getTime() > new Date(dateEnd).getTime() + new Date(timeEnd).getTime())

        newState.submitEnabled = enabled
        newState.showError = invalid
        setFormState(newState)
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Styles>
                {formState.showError && <Error message="Bitiş başlangıçtan önce olamaz!" />}
                {error !== '' && <Error message={error} />}
                <div className="container">
                    <KeyboardDatePicker
                        margin="dense"
                        id="dateBegin"
                        label="Başlangıç tarihi"
                        format="dd/MM/yyyy"
                        value={formState.dateBegin}
                        onChange={date => updateFormState(date, 'dateBegin')}
                    />
                    <KeyboardTimePicker
                        margin="dense"
                        ampm={false}
                        id="timeBegin"
                        label="Başlangıç saati"
                        value={formState.timeBegin}
                        onChange={date => updateFormState(date, 'timeBegin')}
                    />
                    <KeyboardDatePicker
                        margin="dense"
                        id="dateEnd"
                        label="Bitiş tarihi"
                        format="dd/MM/yyyy"
                        value={formState.dateEnd}
                        onChange={date => updateFormState(date, 'dateEnd')}
                    />
                    <KeyboardTimePicker
                        margin="dense"
                        ampm={false}
                        id="timeEnd"
                        label="Bitiş saati"
                        value={formState.timeEnd}
                        onChange={date => updateFormState(date, 'timeEnd')}
                    />
                </div>
                <StyledButton variant="contained" color="primary" disabled={!formState.submitEnabled} onClick={() => onSubmit(formState)}>
                    Göster
                </StyledButton>
            </Styles>
        </MuiPickersUtilsProvider>
    )
}

DateTimeInterval.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
}

DateTimeInterval.defaultProps = {
    error: '',
}

export default DateTimeInterval
