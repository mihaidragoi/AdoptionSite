import { translate } from '@/i18n/translate'

import './Footer.css'

function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className='main-footer'>
            <p className='footer-tagline'>{translate('footer.tagline')}</p>
            <p className='footer-copyright'>{translate('footer.copyright', { year })}</p>
        </footer>
    )
}

export default Footer
