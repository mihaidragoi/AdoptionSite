import { translate } from '@/i18n/translate'

import './Spinner.css'

type SpinnerProps = {
    size?: 'sm' | 'md' | 'lg'
    fullPage?: boolean
}

function Spinner({ size = 'md', fullPage = false }: SpinnerProps) {
    const spinner = (
        <div className={`spinner spinner-${size}`} role='status' aria-label={translate('common.loading')} />
    )

    return fullPage ? <div className='spinner-page'>{spinner}</div> : spinner
}

export default Spinner
