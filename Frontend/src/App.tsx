import { Routes, Route } from 'react-router-dom'

import Footer from "./components/Footer/Footer.tsx"
import NavBar from "./components/NavBar/NavBar.tsx"

import Home from "./pages/Home/Home.tsx"
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register'
import Settings from './pages/Settings/Settings.tsx'
import AdministratorSettings from './pages/AdminSettings/AdminSettings.tsx'
import Favourite from './pages/Favourite/Favourite.tsx'
import Cart from './pages/Cart/Cart.tsx'
import ViewPets from './pages/ViewPets/ViewPets.tsx'
import ViewPet from './pages/ViewPetDetails/ViewPet.tsx'

import GuestRoute from './auth/GuestRoute.tsx'
import ProtectedRoute from './auth/ProtectedRoute.tsx'
import AdminRoute from './auth/AdminRoute.tsx'

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/viewAllPets' element={<ViewPets />} />
                <Route path='/pets/:id' element={<ViewPet />} />

                <Route element={<GuestRoute />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/favourites" element={<Favourite />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>

                <Route element={<AdminRoute />}>
                    <Route path="/administratorSettings" element={<AdministratorSettings />} />
                </Route>
            </Routes>
            <Footer />
        </>
    )
}

export default App
