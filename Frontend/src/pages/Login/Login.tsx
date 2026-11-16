import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { translate } from '@/i18n/translate'
import { getErrorMessage } from '@/api/errors.ts'

import { useAuth } from '@/auth/AuthContext.tsx'

import './Login.css'

function Login() {
    const navigate = useNavigate()
    const { setUser } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (!res.ok) {
                setError(await getErrorMessage(res))
                return
            }

            setUser(await res.json())
            navigate('/')
        } catch {
            setError(translate('errors.NoConnection'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='login'>
            <form className='login-card' onSubmit={handleSubmit}>
                <h1>{translate('login.title')}</h1>
                <p className='login-subtitle'>{translate('login.subtitle')}</p>

                <label className='login-field'>
                    <span>{translate('login.email')}</span>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='email'
                        required
                    />
                </label>

                <label className='login-field'>
                    <span>{translate('login.password')}</span>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='current-password'
                        required
                    />
                </label>

                {error && <p className='login-error'>{error}</p>}

                <button className='login-button' type='submit' disabled={loading}>
                    {loading ? translate('login.submitting') : translate('login.submit')}
                </button>

                <p className='login-footer'>
                    {translate('login.noAccount')} <Link to='/register'>{translate('login.register')}</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
