import React, { useState, useEffect } from 'react'
import { Fade, ButtonGroup, LinearProgress } from '@material-ui/core'
import { RemoveCircle, AddCircle, Delete, Autorenew as AutorenewIcon } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { Skeleton } from '@material-ui/lab'
import { StyledButton, StyledInput } from '../../material-ui'
import TypeSettingsStyles from '../styles/TypeSettingsStyles'
import Popup from '../../hoc/Popup'
import { apiEndpoint, fetchData, getAccessToken } from '../../utils'
import { theme } from '../styles/Theme'

const DUMMY_EMAILS = ['ahmetkurt@gmail.com', 'ahmetkurt@gmail.com', 'ahmetkurt@gmail.com', 'ahmetkurt@gmail.com', 'ahmetkurt@gmail.com']

const Emails = () => {
    const [users, setUsers] = useState([])
    const [userDelete, setUserDelete] = useState(null)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [addVisible, setAddVisible] = useState(false)
    const [validForm, setValidForm] = useState(false)
    const [newUser, setNewUser] = useState({ mail: '', name: '', surname: '' })
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        const response = await fetchData('/user')
        setUsers(response)
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        const { mail, name, surname } = newUser
        setValidForm(mail !== '' && name !== '' && surname !== '')
    }, [newUser])

    const updateForm = e => {
        e.persist()
        const { name, value } = e.target
        setNewUser(prevState => ({ ...prevState, [name]: value }))
    }

    const onShowDeleteModal = user => {
        setUserDelete(user)
        setDeleteVisible(true)
    }

    const onDeleteUser = async () => {
        const { id } = userDelete
        setLoading(true)

        const response = await fetch(`${apiEndpoint}/user/${id}`, {
            method: 'DELETE',
            headers: { 'ratio-auth': getAccessToken(), },
        })
        const parsedResponse = response.json()

        if (parsedResponse.errors) toast.error('Kullanıcı silinemedi')
        else {
            toast.success('Kullanıcı başarıyla silindi')
            setDeleteVisible(false)
        }

        fetchUsers()
    }

    const onCreateUser = async () => {
        setLoading(true)

        const response = await fetch(`${apiEndpoint}/user`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
                'ratio-auth': getAccessToken(),
            },
        })
        const parsedResponse = response.json()

        if (parsedResponse.errors) toast.error('Kullanıcı oluşturulamadı')
        else {
            toast.success('Kullanıcı oluşturuldu')
            setAddVisible(false)
        }

        fetchUsers()
    }

    return (
        <TypeSettingsStyles>
            <div className="space-between">
                <p className="section-title">Kayıtlı Email Adresleri</p>
                <StyledButton variant="outlined" onClick={() => setAddVisible(true)} endIcon={<AddCircle className="add-icon" />}>
                    Yeni Email Ekle
                </StyledButton>
            </div>

            <div className="emails">
                {loading ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    users.map((user, idx) => (
                        <div className="email" key={`email-${idx}`}>
                            <p> {user.mail} </p>
                            <StyledButton variant="outlined" color="secondary" onClick={() => onShowDeleteModal(user)}>
                                <Delete />
                            </StyledButton>
                        </div>
                    ))
                )}
            </div>

            <Popup show={deleteVisible} onClose={() => setDeleteVisible(false)}>
                <div className="popup-content">
                    <span style={{ fontWeight: 'bold' }}>{userDelete && userDelete.mail}</span>
                    <span> maili ile kayıtlı kullanıcıyı silmek istediğinizden emin misiniz?</span>
                </div>
                <div className="popup-buttons">
                    <StyledButton variant="outlined" onClick={() => setDeleteVisible(false)}>
                        İptal
                    </StyledButton>
                    <StyledButton variant="outlined" color="secondary" onClick={onDeleteUser} disabled={loading}>
                        {loading && <AutorenewIcon className="spin" />}
                        Kullanıcıyı Sil
                    </StyledButton>
                </div>
            </Popup>

            <Popup show={addVisible} title="Yeni Kullanıcı" onClose={() => setAddVisible(false)}>
                <div className="popup-content">
                    <StyledInput
                        label="İsim"
                        name="name"
                        value={newUser.name}
                        onChange={e => updateForm(e)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <StyledInput
                        label="Soyisim"
                        name="surname"
                        value={newUser.surname}
                        onChange={e => updateForm(e)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <StyledInput
                        label="Mail"
                        name="mail"
                        value={newUser.mail}
                        onChange={e => updateForm(e)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className="popup-buttons">
                    <StyledButton variant="outlined" onClick={() => setAddVisible(false)}>
                        İptal
                    </StyledButton>
                    <StyledButton variant="contained" color="secondary" onClick={onCreateUser} disabled={!validForm || loading}>
                        {loading && <AutorenewIcon className="spin" />}
                        Kullanıcıyı Ekle
                    </StyledButton>
                </div>
            </Popup>
        </TypeSettingsStyles>
    )
}

export default Emails
