import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/auth/AuthContext'

import Spinner from '@/components/Spinner/Spinner'

function GuestRoute() {
    const { user, loading } = useAuth()

    if (loading) return <Spinner fullPage size='lg' />
    if (user) return <Navigate to='/' replace />

    return <Outlet />
}

export default GuestRoute
