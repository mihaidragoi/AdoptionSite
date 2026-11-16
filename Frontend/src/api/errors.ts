import i18n from '@/i18n'
import { HttpStatus } from '@/api/httpStatus'

export async function getErrorMessage(res: Response): Promise<string> {
    if (res.status >= HttpStatus.InternalServerError) {
        return i18n.t('errors.NoConnection')
    }

    const code = await res.json().catch(() => null)

    if (typeof code === 'string') {
        return i18n.t(`errors.${code}`, { defaultValue: i18n.t('errors.Unknown') })
    }

    return i18n.t('errors.Unknown')
}
