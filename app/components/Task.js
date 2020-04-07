import React from 'react'
import PropTypes from 'prop-types'
import { InfoOutlined, PauseCircleOutlineOutlined, CancelOutlined, Check, Close } from '@material-ui/icons'
import { FaStopCircle, FaMapMarked } from 'react-icons/fa'
import { BorderLinearProgress, StyledButton, StyledFab } from '../material-ui'
import TaskStyles from './styles/TaskStyles'
import Vehicle from './Vehicle'
import TaskSummary from './TaskSummary'
import { theme } from './styles/Theme'
import { setFromDraft } from '../hooks/newTaskCopyReducer'
import getTaskDetail from '../api/task'
import Popup from '../hoc/Popup'

const Confirmation = ({ type, confirmed, cancelled }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>{`Operasyonu ${type === 'pause' ? 'duraklatmak' : 'durdurmak'} istediğinize emin misiniz?`}</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' }}>
            <StyledButton variant="contained" endIcon={<Close />} onClick={cancelled}>
                İptal
            </StyledButton>
            <StyledButton variant="contained" color="secondary" endIcon={<Check />} onClick={confirmed}>
                Evet
            </StyledButton>
        </div>
    </div>
)

Confirmation.propTypes = {
    type: PropTypes.oneOf(['pause', 'stop']).isRequired,
    confirmed: PropTypes.func.isRequired,
    cancelled: PropTypes.func.isRequired,
}

const Task = ({ id, onPause, onCancel }) => {
    const [detail, setDetail] = React.useState({})
    const [showConfirmationPopup, setShowConfirmationPopup] = React.useState(false)
    const [showInfoPopup, setShowInfoPopup] = React.useState(false)
    const [selectedType, setSelectedType] = React.useState('pause')

    React.useEffect(() => {
        async function fetchData() {
            const data = await getTaskDetail(id)
            setDetail(data)
        }
        fetchData()
    }, [])

    const handleActionConfirmed = () => {
        setShowConfirmationPopup(false)
        if (selectedType === 'pause') onPause()
        else onCancel()
    }

    return (
        <>
            <TaskStyles type={detail.type}>
                <div className="color-tag" />
                <div className="block-container">
                    <div className="duration-container">
                        {detail.type !== 'drill' && (
                            <>
                                <FaStopCircle size={20} />
                                <p>
                                    Kamyonların toplam duraklama süresi: <strong>12 dk 2 sn</strong>
                                </p>
                                <FaStopCircle size={20} />
                                <p>
                                    İş makinelerinin toplam duraklama süresi: <strong>12 dk 2 sn</strong>
                                </p>
                            </>
                        )}
                        {detail.type === 'drill' && (
                            <>
                                <FaStopCircle size={20} />
                                <p>
                                    Delik makinelerinin toplam duraklama süresi: <strong>12 dk 2 sn</strong>
                                </p>
                            </>
                        )}
                    </div>
                    <div>
                        {detail.rows &&
                            detail.rows
                                .filter(row => row)
                                .map(row => (
                                    <div key={row.id} className="row">
                                        <div className="tile">
                                            {detail.type !== 'drill' &&
                                                row.vehicles
                                                    .filter(
                                                        ({ vehicleTypeId }) =>
                                                            vehicleTypeId === 2 || vehicleTypeId === 4 || vehicleTypeId === 5
                                                    )
                                                    .map(vehicle => (
                                                        <div key={vehicle.id} className="tile-inner">
                                                            <p>{`${vehicle.manufacturer} ${vehicle.kind}`}</p>
                                                            <Vehicle type="excavator" />
                                                            {console.log(row)}
                                                        </div>
                                                    ))}
                                            {detail.type === 'drill' && (
                                                <>
                                                    <div className="tile-inner">
                                                        <p>{`${row.start.name}`}</p>
                                                        <FaMapMarked size={20} color={theme.accentDark} />
                                                    </div>
                                                    <div className="tile-inner">
                                                        <p>Delik sayısı</p>
                                                        <p>
                                                            <strong>380</strong>
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        {detail.type !== 'drill' && (
                                            <div className="tile">
                                                <div className="tile-inner">
                                                    <p>{row.start.name}</p>
                                                    <FaMapMarked size={20} color={theme.accentDark} />
                                                </div>
                                            </div>
                                        )}
                                        {detail.type !== 'drill' && (
                                            <div className="horizontal-line">
                                                {row.vehicles
                                                    .filter(({ vehicleTypeId }) => vehicleTypeId === 1)
                                                    .map(({ id }) => (
                                                        <Vehicle
                                                            id={id}
                                                            type="truck"
                                                            state={row.state}
                                                            prevState={row.prevState}
                                                            operationId={row.operationId}
                                                            missionId={row.id}
                                                        />
                                                    ))}
                                            </div>
                                        )}
                                        {detail.type === 'drill' && (
                                            <BorderLinearProgress
                                                className="progress-bar"
                                                variant="determinate"
                                                value={detail.mission.progress}
                                            />
                                        )}
                                        {detail.type !== 'drill' && (
                                            <div className="tile">
                                                <div className="tile-inner">
                                                    <p>{row.end && row.end.name}</p>
                                                    <FaMapMarked size={20} color={theme.accentDark} />
                                                </div>
                                            </div>
                                        )}
                                        {detail.type === 'drill' && (
                                            <div className="tile">
                                                <div className="tile-inner">
                                                    <p>Hedef delik sayısı</p>
                                                    <p>
                                                        <strong>1000</strong>
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                    </div>
                </div>
                <div className="task-actions">
                    <StyledFab size="small" color="inherit" variant="round" onClick={() => setShowInfoPopup(true)}>
                        <InfoOutlined />
                    </StyledFab>
                    <StyledFab
                        size="small"
                        color="inherit"
                        variant="round"
                        onClick={() => {
                            setShowConfirmationPopup(true)
                            setSelectedType('pause')
                        }}
                    >
                        <PauseCircleOutlineOutlined />
                    </StyledFab>
                    <StyledFab
                        size="small"
                        color="inherit"
                        variant="round"
                        onClick={() => {
                            setShowConfirmationPopup(true)
                            setSelectedType('stop')
                        }}
                    >
                        <CancelOutlined />
                    </StyledFab>
                </div>
            </TaskStyles>
            <Popup show={showConfirmationPopup} onClose={() => setShowConfirmationPopup(false)}>
                <Confirmation type={selectedType} confirmed={handleActionConfirmed} cancelled={() => setShowConfirmationPopup(false)} />
            </Popup>
            <Popup show={showInfoPopup} onClose={() => setShowInfoPopup(false)}>
                <TaskSummary type="info" confirmed={() => {}} task={setFromDraft({}, detail)} />
            </Popup>
        </>
    )
}

Task.propTypes = {
    id: PropTypes.number.isRequired,
    onPause: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}

export default Task
