import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { translate } from '@/i18n/translate.ts'
import { getErrorMessage } from '@/api/errors.ts'

import '../Login/Login.css'
import './Register.css'

function Register() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    function update(field: keyof typeof form) {
        return (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((f) => ({ ...f, [field]: e.target.value }))
    }

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)

        if (form.password !== form.confirmPassword) {
            setError(translate('errors.PasswordsDontMatch'))
            return
        }

        setLoading(true)
        try {
            const { confirmPassword, ...payload } = form

            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                setError(await getErrorMessage(res))
                return
            }

            navigate('/login')
        } catch {
            setError(translate('errors.NoConnection'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='login'>
            <form className='login-card' onSubmit={handleSubmit}>
                <h1>{translate('register.title')}</h1>
                <p className='login-subtitle'>{translate('register.subtitle')}</p>

                <div className='register-row'>
                    <label className='login-field'>
                        <span>{translate('register.firstName')}</span>
                        <input
                            value={form.firstName}
                            onChange={update('firstName')}
                            autoComplete='given-name'
                            maxLength={100}
                            required
                        />
                    </label>

                    <label className='login-field'>
                        <span>{translate('register.lastName')}</span>
                        <input
                            value={form.lastName}
                            onChange={update('lastName')}
                            autoComplete='family-name'
                            maxLength={100}
                            required
                        />
                    </label>
                </div>

                <label className='login-field'>
                    <span>{translate('register.email')}</span>
                    <input
                        type='email'
                        value={form.email}
                        onChange={update('email')}
                        autoComplete='email'
                        required
                    />
                </label>

                <label className='login-field'>
                    <span>{translate('register.phone')}</span>
                    <input
                        type='tel'
                        value={form.phoneNumber}
                        onChange={update('phoneNumber')}
                        placeholder='+40712345678'
                        pattern='^\+[1-9]\d{7,14}$'
                        title={translate('register.phoneHint')}
                        autoComplete='tel'
                        required
                    />
                </label>

                <label className='login-field'>
                    <span>{translate('register.password')}</span>
                    <input
                        type='password'
                        value={form.password}
                        onChange={update('password')}
                        autoComplete='new-password'
                        minLength={8}
                        required
                    />
                </label>

                <label className='login-field'>
                    <span>{translate('register.confirmPassword')}</span>
                    <input
                        type='password'
                        value={form.confirmPassword}
                        onChange={update('confirmPassword')}
                        autoComplete='new-password'
                        minLength={8}
                        required
                    />
                </label>

                {error && <p className='login-error'>{error}</p>}

                <button className='login-button' type='submit' disabled={loading}>
                    {loading ? translate('register.submitting') : translate('register.submit')}
                </button>

                <p className='login-footer'>
                    {translate('register.haveAccount')} <Link to='/login'>{translate('register.logIn')}</Link>
                </p>
            </form>
        </div>
    )
}

export default Register
