import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core'
import { ArrowRightAlt, Warning } from '@material-ui/icons'
import TaskSummaryStyles from './styles/TaskSummaryStyles'
import { StyledInput, StyledButton } from '../material-ui'

// list component for vehicles
const List = ({ title, data, target }) => (
    <>
        <Toolbar>
            <Typography variant="h6" id={title.replace(/\s/g, '')}>
                {title}
            </Typography>
        </Toolbar>
        <Table aria-labelledby={title.replace(/\s/g, '')} size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Plaka</TableCell>
                    <TableCell>Marka / Model</TableCell>
                    <TableCell align="right">Hedef</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map(vehicle => (
                    <TableRow key={vehicle.id}>
                        <TableCell>{vehicle.plate}</TableCell>
                        <TableCell>{`${vehicle.manufacturer} ${vehicle.model}`}</TableCell>
                        <TableCell align="right">{target[vehicle.id] && `${target[vehicle.id].target} Ton/saat`}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
)

// prop types validation
List.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    target: PropTypes.object,
}

// summary component
const TaskSummary = ({ type, task, confirmed }) => {
    const [name, setName] = React.useState('')

    const updateFormState = e => {
        e.persist()
        setName(e.target.value)
    }

    let trucks = []
    let targetTrucks = {}
    task.missions.forEach(mission => {
        trucks = [...trucks, ...mission.trucks]
        targetTrucks = { ...targetTrucks, ...mission.target }
    })

    return (
        <TaskSummaryStyles>
            {type === 'draft' && <p className="title-secondary">Görev Özet Bilgisi</p>}
            {type === 'final' && (
                <div className="message-strip">
                    <Warning color="primary" classes={{ colorPrimary: 'primary-warning' }} />
                    Personel ve araçlara görev atanacak!
                </div>
            )}
            {task.missions.map(mission => (
                <div className="regions">
                    <div className="regions__load">{mission.loadRegion.name}</div>
                    <ArrowRightAlt fontSize="large" color="primary" classes={{ colorPrimary: 'primary-arrow' }} />
                    <div className="regions__dump">{mission.dumpRegion.name}</div>
                </div>
            ))}
            <List
                title="İş Makineleri"
                data={task.missions[0].excavator ? [task.missions[0].excavator] : []}
                target={{ ...task.missions[0].target }}
                style={{ marginBottom: '10px' }}
            />
            <List title="Kamyonlar" data={trucks} target={targetTrucks} />
            {type !== 'info' && (
                <div className="footer-toolbar">
                    <StyledInput
                        id="name"
                        name="name"
                        label={type === 'draft' ? 'Taslak görev adı' : 'Operasyon adı'}
                        value={name}
                        onChange={updateFormState}
                        margin="dense"
                        variant="outlined"
                    />
                    <StyledButton variant="contained" color="primary" onClick={() => confirmed(name)} disabled={name === ''}>
                        Sakla
                    </StyledButton>
                </div>
            )}
        </TaskSummaryStyles>
    )
}

// prop type validation
TaskSummary.propTypes = {
    type: PropTypes.oneOf(['draft', 'final', 'info']).isRequired,
    task: PropTypes.shape({ missions: PropTypes.array }).isRequired,
    confirmed: PropTypes.func.isRequired,
}

export default TaskSummary
