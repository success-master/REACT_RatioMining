import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { Add, Block } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { grey, teal } from '@material-ui/core/colors'
import TasksStyles from './styles/TasksStyles'
import NewTask from './NewTaskCopy'
import Task from './Task'
import Spinner from './Spinner'
import withLayout from '../hoc/withLayout'
import {
    fetchTasks,
    createNewTask,
    createNewTaskInitialize,
    pauseTask,
    stopTask,
    pauseTaskInitialize,
    stopTaskInitialize,
} from '../store/actions'

const useStyles = makeStyles({
    root: {
        color: grey[700],
        '&.Mui-selected': {
            color: '#fff',
            backgroundColor: teal[400],
            '&:hover': {
                backgroundColor: teal[400],
                filter: 'brightness(1.1)',
            },
        },
    },
    icon: {
        marginLeft: '5px',
    },
})

const Tasks = () => {
    const [showTaskType, setShowTaskType] = React.useState(false)
    const [newTaskType, setNewTaskType] = React.useState('')
    const { currentTasks, loading, error, newTask, pausedTask, stoppedTask } = useSelector(state => state.tasks) // destruct redux state
    const dispatch = useDispatch() // dispatch function for redux
    const classes = useStyles()

    React.useEffect(() => {
        dispatch(fetchTasks())
    }, [])

    React.useEffect(() => {
        if (error) toast.error(error)
        if (newTask) {
            toast.success('Yeni görev oluşturuldu')
            setShowTaskType(false)
            setNewTaskType('')
        }
        dispatch(createNewTaskInitialize())
        dispatch(fetchTasks())
    }, [newTask, error])

    React.useEffect(() => {
        if (pausedTask) dispatch(pauseTaskInitialize())
        if (stoppedTask) dispatch(stopTaskInitialize())
        if (!pausedTask && !stoppedTask) dispatch(fetchTasks())
    }, [pausedTask, stoppedTask])

    const toggleShowNewTask = () => {
        if (showTaskType) setNewTaskType('')
        setShowTaskType(prev => !prev)
    }

    return (
        <>
            <TasksStyles>
                <div className="tasks-container">
                    <ToggleButton
                        value="check"
                        selected={showTaskType}
                        onChange={toggleShowNewTask}
                        size="small"
                        classes={{ root: classes.root }}
                    >
                        Yeni görev
                        {showTaskType ? <Block classes={{ root: classes.icon }} /> : <Add classes={{ root: classes.icon }} />}
                    </ToggleButton>
                    {showTaskType && (
                        <div className="operation-type-container">
                            <ToggleButtonGroup
                                exclusive
                                value={newTaskType}
                                size="small"
                                onChange={(e, selected) => selected && setNewTaskType(selected)}
                            >
                                <ToggleButton key="gem" value="gem" classes={{ root: classes.root }}>
                                    Cevher operasyonu
                                </ToggleButton>
                                <ToggleButton key="drill" value="drill" classes={{ root: classes.root }}>
                                    Delme operasyonu
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    )}
                    {newTaskType !== '' && (
                        <NewTask type={newTaskType} onCreateNewTask={task => dispatch(createNewTask({ ...task, type: newTaskType }))} />
                    )}
                    <h3>Aktif Operasyonlar</h3>
                    <div className="task-list-container">
                        {currentTasks.map(({ id }) => (
                            <Task key={id} id={id} onPause={() => dispatch(pauseTask(id))} onCancel={() => dispatch(stopTask(id))} />
                        ))}
                    </div>
                </div>
            </TasksStyles>
            {loading && <Spinner />}
        </>
    )
}

export default withLayout(Tasks)
