import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { MenuItem } from '@material-ui/core'
import { StyledButton, StyledInput } from '../material-ui'
import NewPersonnelStyles from './styles/NewPersonnelStyles'
import { createPersonnel } from '../store/actions/personnels'
import { getAccessToken, fetchData } from '../utils'

const NewPersonnel = ({ closeView }) => {
    const [formState, setFormState] = useState({ name: '', surname: '', task: '', rfidtag: '', staffTypeId: '', shiftTypeId: '' })
    const [validState, setValidState] = useState({
        name: false,
        surname: false,
        task: false,
        rfidtag: false,
        staffTypeId: false,
        shiftTypeId: false,
    })
    const [formStatus, setFormStatus] = useState(false)
    const [staffTypes, setStaffTypes] = useState([])
    const [shiftTypes, setShiftTypes] = useState([])
    const [loadingOptions, setLoadingOptions] = useState(true)
    const [tagIds, setTagIds] = useState([])
    const loadingPersonnels = useSelector(state => state.personnels.loading)
    const dispatch = useDispatch()

    const updateFormState = e => {
        e.persist()
        setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
        setValidState(prevState => ({ ...prevState, [e.target.name]: e.target.value !== '' }))
    }

    useEffect(() => {
        async function fetchInputOptions() {
            setLoadingOptions(true)
            const responses = await Promise.all([fetchData('/staffType'), fetchData('/shiftType'), fetchData(`/stafftag`)])
            setStaffTypes(responses[0])
            setShiftTypes(responses[1])
            setTagIds(responses[2])
            setLoadingOptions(false)
        }
        fetchInputOptions()
    }, [])

    useEffect(
        () =>
            setFormStatus(
                Object.keys(validState).every(key => {
                    return validState[key] === true
                })
            ),
        [validState]
    )

    const handleSubmit = e => {
        e.preventDefault()
        if (formStatus) dispatch(createPersonnel(formState))
    }

    return (
        <NewPersonnelStyles>
            <span className={`new-personnel-desc ${formStatus ? 'success' : 'fail'}`}>Lütfen tüm alanları doldurunuz</span>
            <div className="item">
                <p>Adı:</p>
                <div className="input-field">
                    <StyledInput
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.name}
                        fullWidth
                    />
                </div>
            </div>
            <div className="item">
                <p>Soyadı:</p>
                <div className="input-field">
                    <StyledInput
                        id="surname"
                        name="surname"
                        value={formState.surname}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.surname}
                        fullWidth
                    />
                </div>
            </div>
            <div className="item">
                <p>Görevi:</p>
                <div className="input-field">
                    <StyledInput
                        id="task"
                        name="task"
                        value={formState.task}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.task}
                        fullWidth
                    />
                </div>
            </div>
            <div className="item">
                <p>Tag ID:</p>
                <div className="input-field">
                    <StyledInput
                        select
                        id="rfidtag"
                        name="rfidtag"
                        value={formState.rfidtag}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.rfidtag}
                        disabled={loadingOptions}
                        fullWidth
                    >
                        {tagIds.map(tagId => (
                            <MenuItem key={`rfidtag-option-${tagId.id}`} value={tagId.id}>
                                {tagId.tagId}
                            </MenuItem>
                        ))}
                    </StyledInput>
                </div>
            </div>

            <div className="item">
                <p>Personel Tipi:</p>
                <div className="input-field">
                    <StyledInput
                        select
                        id="staffTypeId"
                        name="staffTypeId"
                        value={formState.staffTypeId}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.staffTypeId}
                        fullWidth
                        disabled={loadingOptions}
                    >
                        {staffTypes.map(staffType => (
                            <MenuItem key={staffType.name} value={staffType.id}>
                                {staffType.name}
                            </MenuItem>
                        ))}
                    </StyledInput>
                </div>
            </div>
            <div className="item">
                <p>Mesai Tipi:</p>
                <div className="input-field">
                    <StyledInput
                        select
                        id="shiftTypeId"
                        name="shiftTypeId"
                        value={formState.shiftTypeId}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.shiftTypeId}
                        fullWidth
                        disabled={loadingOptions}
                    >
                        {shiftTypes.map(shiftType => (
                            <MenuItem key={shiftType.id} value={shiftType.id}>
                                {shiftType.name}
                            </MenuItem>
                        ))}
                    </StyledInput>
                </div>
            </div>

            <div className="button-container">
                <StyledButton variant="outlined" onClick={closeView}>
                    İPTAL ET
                </StyledButton>
                <StyledButton
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}
                    disabled={!formStatus || loadingOptions || loadingPersonnels}
                >
                    KAYDET
                </StyledButton>
            </div>
        </NewPersonnelStyles>
    )
}

NewPersonnel.propTypes = { closeView: PropTypes.func.isRequired }

export default NewPersonnel
