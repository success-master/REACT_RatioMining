import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { MenuItem } from '@material-ui/core'
import { StyledButton, StyledInput } from '../material-ui'
import NewVehicleStyles from './styles/NewVehicleStyles'
import { createVehicle } from '../store/actions/vehicles'
import { fetchData } from '../utils'

const NewVehicle = ({ closeView }) => {
    const [formState, setFormState] = useState({
        manufacturer: '',
        kind: '',
        class: '',
        year: '',
        plate: '',
        type: '',
        serialno: '',
        vehicleTagId: '',
        vehicletype: '',
        vehicleChildType: '',
    })
    const [validState, setValidState] = useState({
        manufacturer: false,
        kind: false,
        class: false,
        year: false,
        plate: false,
        type: false,
        serialno: false,
        vehicleTagId: false,
        vehicletype: false,
        vehicleChildType: false,
    })
    const [formStatus, setFormStatus] = useState(false)
    const [parentTypes, setParentTypes] = useState([])
    const [childTypes, setChildTypes] = useState([])
    const [filteredChildTypes, setFilteredChildTypes] = useState([])
    const [selectedType, setSelectedType] = useState('')
    const [loadingOptions, setLoadingOptions] = useState(true)
    const [tagIds, setTagIds] = useState([])
    const loadingVehicles = useSelector(state => state.vehicles.loading)
    const dispatch = useDispatch()

    const updateFormState = e => {
        e.persist()
        setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
        setValidState(prevState => ({ ...prevState, [e.target.name]: e.target.value !== '' }))
    }

    useEffect(() => {
        async function fetchInputOptions() {
            setLoadingOptions(true)
            const responses = await Promise.all([fetchData('/vehicleType'), fetchData('/vehicleTag')])
            const parents = responses[0].filter(type => type.parent === null)
            setParentTypes(parents)
            const childs = responses[0].filter(type => type.parent !== null)
            setChildTypes(childs)
            const availableTagIds = responses[1].filter(tagId => tagId.vehicle === null)
            setTagIds(availableTagIds)
            setLoadingOptions(false)
        }
        fetchInputOptions()
    }, [])

    useEffect(() => {
        const filteredChilds = childTypes.filter(type => type.parent === selectedType)
        setFilteredChildTypes(filteredChilds)
        setFormState(prevState => ({ ...prevState, vehicleChildType: '' }))
        setValidState(prevState => ({ ...prevState, vehicleChildType: false }))
    }, [selectedType])

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
        const { vehicleChildType } = formState
        const vehicleForm = { ...formState, vehicletype: vehicleChildType }

        if (formStatus) dispatch(createVehicle(vehicleForm))
    }

    return (
        <NewVehicleStyles>
            <span className={`new-personnel-desc ${formStatus ? 'success' : 'fail'}`}>Lütfen tüm alanları doldurunuz</span>
            <div className="form-section">
                <p>Ruhsat Bilgileri</p>
            </div>
            <div className="item">
                <p>Markası:</p>
                <div className="input-field">
                    <StyledInput
                        id="manufacturer"
                        name="manufacturer"
                        value={formState.manufacturer}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.manufacturer}
                        fullWidth
                    />
                </div>
            </div>
            <div className="item">
                <p>Tipi:</p>
                <div className="input-field">
                    <StyledInput
                        id="type"
                        name="type"
                        value={formState.type}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.type}
                        fullWidth
                    />
                </div>
            </div>
            <div className="item">
                <p>Cinsi:</p>
                <div className="input-field">
                    <StyledInput
                        id="kind"
                        name="kind"
                        value={formState.kind}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.kind}
                        fullWidth
                    />
                </div>
            </div>
            <div className="item">
                <p>Model Yılı:</p>
                <div className="input-field">
                    <StyledInput
                        id="year"
                        name="year"
                        value={formState.year}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        type="number"
                        error={!validState.year}
                        fullWidth
                    />
                </div>
            </div>
            <div className="item">
                <p>Araç Sınıfı:</p>
                <div className="input-field">
                    <StyledInput
                        id="class"
                        name="class"
                        value={formState.class}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.class}
                        fullWidth
                    />
                </div>
            </div>
            <div className="item">
                <p>Plaka:</p>
                <div className="input-field">
                    <StyledInput
                        id="plate"
                        name="plate"
                        value={formState.plate}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.plate}
                        fullWidth
                    />
                </div>
            </div>
            <div className="item">
                <p>Ruhsat Seri No:</p>
                <div className="input-field">
                    <StyledInput
                        id="serialno"
                        name="serialno"
                        value={formState.serialno}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        type="number"
                        error={!validState.serialno}
                        fullWidth
                    />
                </div>
            </div>
            <div className="form-section">
                <p>Sistem Bilgileri</p>
            </div>
            <div className="item">
                <p>Tag ID:</p>
                <div className="input-field">
                    <StyledInput
                        select
                        id="vehicleTagId"
                        name="vehicleTagId"
                        value={formState.vehicleTagId}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        type="number"
                        error={!validState.vehicleTagId}
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
                <p>Araç Ana Tipi:</p>
                <div className="input-field">
                    <StyledInput
                        select
                        id="vehicletype"
                        name="vehicletype"
                        value={formState.vehicletype}
                        onChange={e => {
                            updateFormState(e)
                            setSelectedType(e.target.value)
                        }}
                        margin="dense"
                        variant="outlined"
                        error={!validState.vehicletype}
                        fullWidth
                        disabled={loadingOptions}
                    >
                        {parentTypes.map(vehicleType => (
                            <MenuItem key={`vehicletype-option-${vehicleType.id}`} value={vehicleType.id}>
                                {vehicleType.name}
                            </MenuItem>
                        ))}
                    </StyledInput>
                </div>
            </div>
            <div className="item">
                <p>Araç Alt Tipi:</p>
                <div className="input-field">
                    <StyledInput
                        select
                        id="vehicleChildType"
                        name="vehicleChildType"
                        value={filteredChildTypes.length > 0 ? formState.vehicleChildType : 'invalid'}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                        error={!validState.vehicleChildType}
                        fullWidth
                        disabled={loadingOptions || filteredChildTypes.length === 0}
                    >
                        {filteredChildTypes.length > 0 ? (
                            filteredChildTypes.map(vehicleType => (
                                <MenuItem key={`vehicletype-option-${vehicleType.id}`} value={vehicleType.id}>
                                    {vehicleType.name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem key="vehicletype-option-invalid" value="invalid">
                                Araç Alt Tipi Yok
                            </MenuItem>
                        )}
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
                    disabled={!formStatus || loadingOptions || loadingVehicles}
                >
                    KAYDET
                </StyledButton>
            </div>
        </NewVehicleStyles>
    )
}

NewVehicle.propTypes = {
    closeView: PropTypes.func.isRequired,
}

export default NewVehicle
