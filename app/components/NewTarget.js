import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { InputAdornment, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { StyledButton, StyledInput } from '../material-ui'

const targetTypes = ['Tip 1', 'Tip 2']

const NewTargetStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    menu: {
        width: 200,
    },
}))

const NewTarget = ({ currentTarget, excavators, trucks, confirmed }) => {
    const [formState, setFormState] = React.useState(null)

    React.useEffect(() => {
        // format and set initial form state
        if (!currentTarget) {
            const excavatorsObj = excavators
                .map(vehicle => ({ ...vehicle, id: vehicle.id.toString(), type: 'excavator', target: '' }))
                .reduce(
                    (total, curr) => ({
                        ...total,
                        [curr.id]: { ...curr },
                    }),
                    {}
                )
            const trucksObj = trucks
                .map(vehicle => ({ ...vehicle, id: vehicle.id.toString(), type: 'truck', target: '' }))
                .reduce(
                    (total, curr) => ({
                        ...total,
                        [curr.id]: { ...curr },
                    }),
                    {}
                )
            setFormState({
                type: '',
                ...excavatorsObj,
                ...trucksObj,
            })
        } else {
            setFormState({ ...currentTarget })
        }
    }, [])

    const classes = useStyles()

    const updateFormState = (e, id) => {
        e.persist()
        if (id === 'type') setFormState(prevState => ({ ...prevState, type: e.target.value }))
        else setFormState(prevState => ({ ...prevState, [id]: { ...prevState[id], target: e.target.value } }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        confirmed({ ...formState })
    }

    return (
        <NewTargetStyles>
            <form method="post" autoComplete="off" onSubmit={handleSubmit}>
                {/* {formState && (
                    <StyledInput
                        fullWidth
                        select
                        id="type"
                        label="Hedef tipi"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={formState.type}
                        onChange={e => updateFormState(e, 'type')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                    >
                        {targetTypes.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </StyledInput>
                )} */}
                {formState &&
                    Object.values(formState)
                        .filter(el => el.type === 'excavator')
                        .map(({ id, manufacturer, model, target }) => (
                            <StyledInput
                                key={id}
                                fullWidth
                                id={id}
                                label={`${manufacturer} ${model}`}
                                className={classes.textField}
                                margin="dense"
                                variant="outlined"
                                value={target}
                                onChange={e => updateFormState(e, id)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Ton</InputAdornment>,
                                }}
                            />
                        ))}
                {formState &&
                    Object.values(formState)
                        .filter(el => el.type === 'truck')
                        .map(({ id, manufacturer, model, target }) => (
                            <StyledInput
                                key={id}
                                fullWidth
                                id={id}
                                label={`${manufacturer} ${model}`}
                                className={classes.textField}
                                margin="dense"
                                variant="outlined"
                                value={target}
                                onChange={e => updateFormState(e, id)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Ton</InputAdornment>,
                                }}
                            />
                        ))}
                <StyledButton variant="contained" color="primary" onClick={handleSubmit}>
                    Sakla
                </StyledButton>
            </form>
        </NewTargetStyles>
    )
}

NewTarget.propTypes = {
    currentTarget: PropTypes.object,
    excavators: PropTypes.arrayOf(PropTypes.object).isRequired,
    trucks: PropTypes.arrayOf(PropTypes.object).isRequired,
    confirmed: PropTypes.func.isRequired,
}

NewTarget.defaultProps = {
    currentTarget: null,
}

export default NewTarget
