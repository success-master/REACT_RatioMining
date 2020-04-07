import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { AddCircle, RemoveCircle } from '@material-ui/icons'
import { StyledButton } from '../material-ui'
import PersonnelsStyles from './styles/PersonnelsStyles'
import Table from './Table'
import withLayout from '../hoc/withLayout'
import NewPersonnel from './NewPersonnel'
import { fetchPersonnelList, resetPersonnel } from '../store/actions/personnels'
import { getPersonnelTypePath } from '../utils'

const Personnels = () => {
    const personnelList = useSelector(state => state.personnels.personnelList)
    const personnelsLoading = useSelector(state => state.personnels.loading)
    const dispatch = useDispatch()
    const history = useHistory()

    const [showNewPersonnel, setShowNewPersonnel] = React.useState(false)
    const newPersonnel = useSelector(state => state.personnels.newPersonnel)
    const personnelError = useSelector(state => state.personnels.error)

    useEffect(() => {
        dispatch(fetchPersonnelList())
    }, [])

    useEffect(() => {
        if (personnelError) toast.error(personnelError)
        if (newPersonnel) toast.success('Personel Kaydedildi')

        dispatch(resetPersonnel())
    }, [newPersonnel, personnelError])

    const toggleShowNewPersonnel = () => {
        setShowNewPersonnel(prev => !prev)
    }

    const onRowClick = row => {
        history.push({
            pathname: getPersonnelTypePath(row.staffTypeId),
            state: { personnelId: row.id },
        })
    }

    const tableColumns = [
        {
            title: '',
            dataIndex: 'icon',
            render: row => (row.icon ? <img className="personnel-photo" src={row.icon} alt={`icon-${row.name}`} /> : null),
            cellProps: {
                width: '10%',
            },
        },
        {
            title: 'ID',
            dataIndex: 'id',
            cellProps: {
                width: '20%',
            },
        },
        {
            title: 'Ad-Soyad',
            dataIndex: 'name',
            render: row => <span>{`${row.name} ${row.surname}`}</span>,
            cellProps: {
                width: '35%',
            },
        },
        {
            title: 'Personel Tipi',
            dataIndex: 'stafftype',
            render: row => <span>{row.staff_type && row.staff_type.name}</span>,
            cellProps: {
                width: '35%',
            },
        },
    ]

    return (
        <PersonnelsStyles>
            <div className="personnels-container">
                <div className="new-personnel-container">
                    <StyledButton
                        variant="outlined"
                        onClick={toggleShowNewPersonnel}
                        endIcon={
                            showNewPersonnel ? (
                                <RemoveCircle classes={{ root: 'remove-icon' }} />
                            ) : (
                                <AddCircle classes={{ root: 'add-icon' }} />
                            )
                        }
                    >
                        Yeni personel {showNewPersonnel ? 'gizle' : 'ekle'}
                    </StyledButton>
                    {showNewPersonnel && <NewPersonnel closeView={toggleShowNewPersonnel} />}
                </div>

                <Table loading={personnelsLoading} data={personnelList} columns={tableColumns} onRowClick={onRowClick} />
            </div>
        </PersonnelsStyles>
    )
}

export default withLayout(Personnels)
