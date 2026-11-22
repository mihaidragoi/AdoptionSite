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
        fetch('/api/auth/me')
            .then((res) => (res.ok ? res.json() : null))
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    }, [])

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
