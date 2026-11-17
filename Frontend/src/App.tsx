import { Routes, Route } from 'react-router-dom'

import Footer from "./components/Footer/Footer.tsx"
import NavBar from "./components/NavBar/NavBar.tsx"

import Home from "./pages/Home/Home.tsx"
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register'
import Settings from './pages/Settings/Settings.tsx'

import GuestRoute from './auth/GuestRoute.tsx'
import ProtectedRoute from './auth/ProtectedRoute.tsx'

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />

                <Route element={<GuestRoute />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
            <Footer />
        </>
    )
}

export default App
