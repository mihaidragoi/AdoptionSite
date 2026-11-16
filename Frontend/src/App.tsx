import { Routes, Route } from 'react-router-dom'

import Footer from "./components/Footer/Footer.tsx"
import NavBar from "./components/NavBar/NavBar.tsx"

import Home from "./pages/Home/Home.tsx"
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register'

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
