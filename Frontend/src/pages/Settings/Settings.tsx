import { useEffect, useState } from 'react'

import { translate } from '@/i18n/translate'
import { useAuth } from '@/auth/AuthContext'

import { getErrorMessage } from '@/api/errors'

import Spinner from '@/components/Spinner/Spinner'
import defaultProfilePic from '@/assets/testing/profile_pic.png'

import './Settings.css'

type Status = { type: 'success' | 'error'; message: string } | null

function Settings() {
    const { user, setUser, refreshProfilePic, profilePicVersion } = useAuth()

    const [profile, setProfile] = useState({
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
        phoneNumber: user?.phoneNumber ?? '',
    })
    const [password, setPassword] = useState({ current: '', next: '', confirm: '' })

    const [profileStatus, setProfileStatus] = useState<Status>(null)
    const [passwordStatus, setPasswordStatus] = useState<Status>(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)

    const [profilePic, setProfilePic] = useState<string>(defaultProfilePic)

    useEffect(() => {
        if (!user) {
            setProfilePic(defaultProfilePic)
            return
        }

        setProfilePic(`/api/user/profile-picture?t=${profilePicVersion}`)
    }, [user, profilePicVersion])

    const [avatarLoading, setAvatarLoading] = useState(false)
    const [avatarStatus, setAvatarStatus] = useState<Status>(null)

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setProfilePic(URL.createObjectURL(file))
        setAvatarStatus(null)

        uploadAvatar(file)
    }

    async function uploadAvatar(file: File) {
        setAvatarLoading(true)
        setAvatarStatus(null)

        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await fetch('/api/user/profile-picture', {
                method: 'PUT',
                body: formData,
            })

            if (!res.ok) {
                setAvatarStatus({ type: 'error', message: await getErrorMessage(res) })
                return
            }

            refreshProfilePic()
            setAvatarStatus({ type: 'success', message: translate('settings.saved') })
        } catch {
            setAvatarStatus({ type: 'error', message: translate('errors.NoConnection') })
        } finally {
            setAvatarLoading(false)
        }
    }

    async function removeAvatar() {
        setAvatarLoading(true)
        setAvatarStatus(null)

        try {
            const res = await fetch('/api/user/profile-picture', {
                method: 'DELETE',
            })

            if (!res.ok) {
                setAvatarStatus({ type: 'error', message: await getErrorMessage(res) })
                return
            }

            refreshProfilePic()
            setAvatarStatus({ type: 'success', message: translate('settings.saved') })
        } catch {
            setAvatarStatus({ type: 'error', message: translate('errors.NoConnection') })
        } finally {
            setAvatarLoading(false)
        }
    }

    function changeLanguage(lang: 'en' | 'ro') {
        const url = new URL(window.location.href)
        url.searchParams.set('lang', lang)
        window.location.href = url.toString()
    }

    function onProfileChange(e: React.ChangeEvent<HTMLInputElement>) {
        setProfile((p) => ({ ...p, [e.target.name]: e.target.value }))
        setProfileStatus(null)
    }

    function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword((p) => ({ ...p, [e.target.name]: e.target.value }))
        setPasswordStatus(null)
    }

    async function handleProfileSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setProfileStatus(null)
        setProfileLoading(true)

        try {
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile),
            })

            if (!res.ok) {
                setProfileStatus({ type: 'error', message: await getErrorMessage(res) })
                return
            }

            setUser(await res.json())
            setProfileStatus({ type: 'success', message: translate('settings.saved') })
        } catch {
            setProfileStatus({ type: 'error', message: translate('errors.NoConnection') })
        } finally {
            setProfileLoading(false)
        }
    }

    async function handlePasswordSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault()
        setPasswordStatus(null)
        setPasswordLoading(true)

        if (password.next !== password.confirm) {
            setPasswordStatus({ type: 'error', message: translate('settings.passwordMismatch') })
            setPasswordLoading(false)
            return
        }

        try {
            const res = await fetch('/api/user/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: password.current,
                    newPassword: password.next,
                }),
            })

            if (!res.ok) {
                setPasswordStatus({ type: 'error', message: await getErrorMessage(res) })
                return
            }

            setPassword({ current: '', next: '', confirm: '' })
            setPasswordStatus({ type: 'success', message: translate('settings.saved') })
        } catch {
            setPasswordStatus({ type: 'error', message: translate('errors.NoConnection') })
        } finally {
            setPasswordLoading(false)
        }
    }

    return (
        <main className='settings'>
            <h1 className='settings-title'>{translate('settings.title')}</h1>

            <div className='settings-card settings-avatar'>
                <h2>{translate('settings.profilePicture')}</h2>

                <div className='avatar-content'>
                    <div className='avatar-preview'>
                        {avatarLoading ? (
                            <div className='avatar-spinner'><Spinner size='sm' /></div>
                        ) : (
                            <img
                                src={profilePic}
                                alt={translate('settings.profilePictureAlt')}
                                className="avatar-image"
                                onError={() => setProfilePic(defaultProfilePic)}
                            />
                        )}
                    </div>

                    <div className='avatar-actions'>
                        <label className='settings-button avatar-upload'>
                            {avatarLoading ? translate('common.loading') : translate('settings.changePicture')}
                            <input
                                type='file'
                                accept='.jpg, .jpeg, .png'
                                onChange={handleAvatarChange}
                                disabled={avatarLoading}
                                hidden
                            />
                        </label>

                        <button
                            type='button'
                            className='avatar-remove'
                            onClick={removeAvatar}
                            disabled={avatarLoading}
                        >
                            {translate('settings.removePicture')}
                        </button>
                    </div>
                </div>

                {avatarStatus && (
                    <p className={`settings-status ${avatarStatus.type}`} role='status' style={{ marginTop: '1rem' }}>
                        {avatarStatus.message}
                    </p>
                )}
            </div>

            <form className='settings-card' onSubmit={handleProfileSubmit}>
                <h2>{translate('settings.profile')}</h2>

                <div className='settings-row'>
                    <label className='settings-field'>
                        <span>{translate('settings.lastName')}</span>
                        <input name='lastName' value={profile.lastName} onChange={onProfileChange}
                            autoComplete='family-name' required />
                    </label>
                    <label className='settings-field'>
                        <span>{translate('settings.firstName')}</span>
                        <input name='firstName' value={profile.firstName} onChange={onProfileChange}
                            autoComplete='given-name' required />
                    </label>
                </div>

                <label className='settings-field'>
                    <span>{translate('settings.email')}</span>
                    <input type='email' name='email' value={profile.email} onChange={onProfileChange}
                        autoComplete='email' required />
                </label>

                <label className='settings-field'>
                    <span>{translate('settings.phone')}</span>
                    <input type='tel' name='phoneNumber' value={profile.phoneNumber} onChange={onProfileChange}
                        autoComplete='tel' />
                </label>

                {profileStatus && (
                    <p className={`settings-status ${profileStatus.type}`} role='status'>
                        {profileStatus.message}
                    </p>
                )}

                <button type='submit' className='settings-button' disabled={profileLoading}>
                    {profileLoading ? <Spinner size='sm' /> : translate('settings.save')}
                </button>
            </form>

            <form className='settings-card' onSubmit={handlePasswordSubmit}>
                <h2>{translate('settings.security')}</h2>

                <label className='settings-field'>
                    <span>{translate('settings.currentPassword')}</span>
                    <input type='password' name='current' value={password.current} onChange={onPasswordChange}
                        autoComplete='current-password' required />
                </label>

                <label className='settings-field'>
                    <span>{translate('settings.newPassword')}</span>
                    <input type='password' name='next' value={password.next} onChange={onPasswordChange}
                        autoComplete='new-password' minLength={8} required />
                </label>

                <label className='settings-field'>
                    <span>{translate('settings.confirmPassword')}</span>
                    <input type='password' name='confirm' value={password.confirm} onChange={onPasswordChange}
                        autoComplete='new-password' minLength={8} required />
                </label>

                {passwordStatus && (
                    <p className={`settings-status ${passwordStatus.type}`} role='status'>
                        {passwordStatus.message}
                    </p>
                )}

                <button type='submit' className='settings-button' disabled={passwordLoading}>
                    {passwordLoading ? <Spinner size='sm' /> : translate('settings.changePassword')}
                </button>
            </form>

            <div className='settings-language'>
                <button type='button' onClick={() => changeLanguage('ro')}>RO</button>
                <button type='button' onClick={() => changeLanguage('en')}>EN</button>
            </div>
        </main>
    )
}

export default Settings
