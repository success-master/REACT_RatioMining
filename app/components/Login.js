import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import LoginStyles from './styles/LoginStyles'
import FormStyles from './styles/FormStyles'
import { StyledInput, StyledButton } from '../material-ui'
import { initiateLogin } from '../store/actions'
import logo from '../../static/logo-white.png'
import Error from './ErrorInline'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formState, setFormState] = useState({ username: '', password: '' })
    const [validState, setValidState] = useState({ username: true, password: true })
    const loading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)
    const dispatch = useDispatch()

    const updateFormState = e => {
        e.persist()
        setFormState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleInputFocus = e => {
        e.persist()
        setValidState(prevState => ({ ...prevState, [e.target.name]: true }))
    }

    const validate = () => {
        const { username, password } = formState
        setValidState({ username: username !== '', password: password !== '' })
        return username !== '' && password !== ''
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) dispatch(initiateLogin(formState.username, formState.password))
    }

    return (
        <LoginStyles>
            <img src={logo} alt="logo white" />
            <div className="form-container">
                <FormStyles>
                    <form method="post" onSubmit={handleSubmit}>
                        <fieldset style={{ border: 'none' }} disabled={loading} aria-busy={loading}>
                            {error && <Error message={error} />}
                            <StyledInput
                                id="username"
                                name="username"
                                label="Kullanıcı adı"
                                value={formState.username}
                                onChange={updateFormState}
                                className={!validState.username ? 'wiggle' : null}
                                margin="dense"
                                variant="outlined"
                                error={!validState.username}
                                fullWidth
                                onFocus={handleInputFocus}
                            />
                            <div style={{ position: 'relative' }} className={!validState.username ? 'wiggle' : null}>
                                <StyledInput
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'string' : 'password'}
                                    label="Şifre"
                                    value={formState.password}
                                    onChange={updateFormState}
                                    margin="dense"
                                    variant="outlined"
                                    error={!validState.password}
                                    fullWidth
                                    onFocus={handleInputFocus}
                                />
                                <button type="button" className="button-inline" onClick={() => setShowPassword(prev => !prev)}>
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                            <input type="submit" hidden />
                            <StyledButton variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
                                GİRİŞ YAP
                            </StyledButton>
                        </fieldset>
                    </form>
                </FormStyles>
            </div>
        </LoginStyles>
    )
}

export default Login
