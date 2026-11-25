import { createContext, useContext, useEffect, useState } from 'react'

export type User = {
    id: number
    email: string
    phoneNumber: string
    firstName: string
    lastName: string
    role: string
}

type AuthContextValue = {
    user: User | null
    loading: boolean
    setUser: (u: User | null) => void
    logout: () => Promise<void>
    refreshProfilePic: () => void
    profilePicVersion: number
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [profilePicVersion, setProfilePicVersion] = useState(Date.now())

    useEffect(() => {
        const originalFetch = window.fetch

        window.fetch = async (...args) => {
            const res = await originalFetch(...args)

            const url = typeof args[0] === 'string' ? args[0] : args[0] instanceof Request ? args[0].url : args[0].toString()
            if (res.status === 401 && !url.includes('/api/auth/login')) {
                setUser(null)
            }
            return res
        }

        return () => {
            window.fetch = originalFetch
        }
    }, [])

    useEffect(() => {
        fetch('/api/auth/me')
            .then((res) => (res.ok ? res.json() : null))
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (!user) return

        const check = () => { fetch('/api/auth/me') }
        const id = setInterval(check, 60_000)
        const onVisible = () => {
            if (document.visibilityState === 'visible') check()
        }
        document.addEventListener('visibilitychange', onVisible)

        return () => {
            clearInterval(id)
            document.removeEventListener('visibilitychange', onVisible)
        }
    }, [user])

    async function logout() {
        await fetch('/api/auth/logout', { method: 'POST' })
        setUser(null)
    }

    function refreshProfilePic() {
        setProfilePicVersion(Date.now())
    }

    return (
        <AuthContext.Provider value={{ user, loading, setUser, logout, refreshProfilePic, profilePicVersion }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
    return ctx
}
