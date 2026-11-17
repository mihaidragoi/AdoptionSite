import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { translate } from '@/i18n/translate'

import favoriteIcon from '@/assets/navbar/heart.svg'
import cartIcon from '@/assets/navbar/cart.svg'
import defaultProfilePic from '@/assets/testing/profile_pic.png'

import { useAuth } from '@/auth/AuthContext'

import './NavBar.css'

function NavBar() {
    const { user, logout, profilePicVersion } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const [profilePic, setProfilePic] = useState(defaultProfilePic)

    useEffect(() => {
        if (!user) {
            setProfilePic(defaultProfilePic)
            return
        }

        setProfilePic(`/api/user/profile-picture?t=${profilePicVersion}`)
    }, [user, profilePicVersion])

    useEffect(() => {
        if (!menuOpen) return

        function onPointerDown(e: PointerEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') setMenuOpen(false)
        }

        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [menuOpen])

    async function handleLogout() {
        setMenuOpen(false)
        await logout()
        navigate('/login')
    }

    return (
        <div className="main-nav-bar">
            <Link to='/' className='logo'>Pet Alliance</Link>
            <input className='nav-search' placeholder={translate('navbar.search')} />

            <div className='account-bar'>
                {user ? (
                    <div className='nav-user' ref={menuRef}>
                        <span className='nav-username'>
                            {translate('navbar.greeting', { name: user.firstName })}
                        </span>
                        <button
                            type='button'
                            className='nav-account-button'
                            onClick={() => setMenuOpen((o) => !o)}
                            aria-haspopup='menu'
                            aria-expanded={menuOpen}
                            aria-label={translate('navbar.account')}
                        >
                            <img
                                className='nav-account'
                                src={profilePic}
                                alt=''
                                onError={() => setProfilePic(defaultProfilePic)}
                            />
                        </button>

                        {menuOpen && (
                            <div className='nav-menu' role='menu'>
                                <Link
                                    to='/settings'
                                    className='nav-menu-item'
                                    role='menuitem'
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {translate('navbar.settings')}
                                </Link>
                                <button
                                    type='button'
                                    className='nav-menu-item'
                                    role='menuitem'
                                    onClick={handleLogout}
                                >
                                    {translate('navbar.logout')}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to='/login'>
                        <img
                            className='nav-account'
                            src={profilePic}
                            alt=''
                            onError={() => setProfilePic(defaultProfilePic)}
                        />
                    </Link>
                )}

                <img className='nav-favorite' src={favoriteIcon} alt={translate('navbar.favorites')} />

                <Link to='/cart'>
                <img className='nav-cart' src={cartIcon} alt={translate('navbar.cart')} />
                </Link>
            </div>
        </div>
    )
}

export default NavBar
