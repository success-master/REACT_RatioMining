import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CheckCircleOutlineOutlined } from '@material-ui/icons'
import { StyledButton, StyledInput } from '../material-ui'
import { theme } from './styles/Theme'
import Error from './ErrorInline'

const NewRoadStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    > form {
        width: 80%;
        display: flex;
        flex-direction: column;
        > button {
            align-self: center;
        }
    }
    > div:first-child {
        margin-bottom: 10px;
    }
`

const NewRoad = ({ onSubmit, newRoad, error }) => {
    const [formState, setFormState] = React.useState({
        name: '',
        maxSpeed: '',
    })

    const updateFormState = e => {
        e.persist()
        setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit(formState)
    }

    if (newRoad)
        return (
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                <CheckCircleOutlineOutlined fontSize="large" style={{ color: theme.green, marginRight: '10px' }} />
                {newRoad.name} kaydedildi
            </div>
        )
    return (
        <NewRoadStyles>
            {error && <Error fullwidth message="Something went wrong!" />}
            <form method="post" autoComplete="off" onSubmit={handleSubmit}>
                <StyledInput
                    fullWidth
                    id="name"
                    name="name"
                    label="Yol adı"
                    margin="dense"
                    variant="outlined"
                    value={formState.name}
                    onChange={updateFormState}
                />
                <StyledInput
                    fullWidth
                    type="number"
                    id="maxSpeed"
                    name="maxSpeed"
                    label="Hız limiti (km/sa)"
                    margin="dense"
                    variant="outlined"
                    value={formState.maxSpeed}
                    onChange={updateFormState}
                />
                <StyledButton variant="contained" color="primary" onClick={handleSubmit}>
                    Sakla
                </StyledButton>
            </form>
        </NewRoadStyles>
    )
}

NewRoad.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    newRoad: PropTypes.shape({
        name: PropTypes.string,
    }),
}

NewRoad.defaultProps = {
    error: '',
    newRoad: {},
}

export default NewRoad
