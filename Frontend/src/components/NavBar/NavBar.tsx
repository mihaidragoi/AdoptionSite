import { Link } from 'react-router-dom'

import { translate } from '@/i18n/translate'

import sampleProfilePic from '@/assets/testing/profile_pic.png'

import favoriteIcon from '@/assets/navbar/heart.svg'
import cartIcon from '@/assets/navbar/cart.svg'
import logoutIcon from '@/assets/navbar/logout.svg'

import { useAuth } from '@/auth/AuthContext'

import './NavBar.css'

function NavBar() {
    const { user, logout } = useAuth()

    return (
        <div className="main-nav-bar">
            <Link to='/' className='logo'>Pet Alliance</Link>
            <input className='nav-search' placeholder={translate('navbar.search')} />

            <div className='account-bar'>
                {user ? (
                    <>
                        <div className='nav-user'>
                            <span className='nav-username'>
                                {translate('navbar.greeting', { name: user.firstName })}
                            </span>
                            <img className='nav-account' src={sampleProfilePic} alt={translate('navbar.account')} />
                        </div>
                        <button className='nav-logout' onClick={logout} aria-label={translate('navbar.logout')} title={translate('navbar.logout')}>
                            <img src={logoutIcon} alt='' />
                        </button>
                    </>
                ) : (
                    <Link to='/login'>
                        <img className='nav-account' src={sampleProfilePic} alt={translate('navbar.account')} />
                    </Link>
                )}

                <img className='nav-favorite' src={favoriteIcon} alt={translate('navbar.favorites')} />
                <img className='nav-cart' src={cartIcon} alt={translate('navbar.cart')} />
            </div>
        </div>
    )
}

export default NavBar
