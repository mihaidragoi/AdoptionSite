import { useEffect, useState } from 'react'

import { translate } from '../../i18n/translate.ts'
import { getErrorMessage } from '../../api/errors'
import type { PetAdminData } from '@/types/admin'

import './AdminSettings.css'

function AdminSettings() {
    const [pets, setPets] = useState<PetAdminData[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPets() {
            try {
                const response = await fetch('/api/admin/pets')
                if (!response.ok) {
                    setError(await getErrorMessage(response))
                    return
                }
                setPets(await response.json())
                setError(null)
            }
            catch {
                setError(translate('errors.NoConnection'))
            }
            finally {
                setLoading(false)
            }
        }
        fetchPets()
    }, [])

    return (
        <main className="admin-settings-page">
            <h1 className="admin-settings-title">{translate('navbar.administratorSettings')}</h1>
            <button className="admin-button admin-button-add">{translate('admin.addPet')}</button>
            {error && <p className="admin-error">{error}</p>}

            {loading ? (
                <p className="admin-loading">{translate('common.loading')}</p>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>{translate('admin.name')}</th>
                                <th>{translate('admin.type')}</th>
                                <th>{translate('admin.shelterDate')}</th>
                                <th>{translate('admin.status')}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map((pet) => {
                                const cover = pet.media.find(m => m.isCover)
                                return (
                                    <tr key={pet.id}>
                                        <td>
                                            {cover && <img src={cover.url} alt={pet.name} className="admin-table-img" />}
                                        </td>
                                        <td>{pet.name}</td>
                                        <td>{pet.type}</td>
                                        <td>{pet.shelterDate}</td>
                                        <td>
                                            <span className={`admin-status ${pet.isAdopted ? 'admin-status-adopted' : 'admin-status-available'}`}>
                                                {pet.isAdopted ? translate('admin.adopted') : translate('admin.available')}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="admin-actions">
                                                <button className="admin-button">{translate('admin.edit')}</button>
                                                <button className="admin-button admin-button-danger">{translate('admin.delete')}</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    )
}

export default AdminSettings