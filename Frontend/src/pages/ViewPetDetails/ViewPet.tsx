import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { translate } from '@/i18n/translate.ts'
import { formatAge } from '@/utils/FormatAge.ts'
import type { PetDetails } from '@/types/pet'

import './ViewPet.css'

import { getErrorMessage } from '../../api/errors'

function ViewPet() {
    const { id } = useParams()
    const [pet, setPet] = useState<PetDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchPet() {
            try {
                const response = await fetch(`/api/pets/${id}`)
                if (!response.ok) {
                    setError(await getErrorMessage(response))
                    return
                }
                setPet(await response.json())
            }
            catch {
                setError(translate('errors.NoConnection'))
            }
            finally {
                setLoading(false)
            }
        }
        fetchPet()
    }, [id])

    if (loading) return <p className='view-pet-message'>{translate('common.loading')}</p>
    if (error || !pet) return <p className='view-pet-error'>{error}</p>

    return (
        <div className='view-pet'>
            <div className='view-pet-images'>
                {pet.media.map(m => (
                    <img key={m.url} src={m.url} alt={pet.name} />
                ))}
            </div>

            <div className='view-pet-info'>
                <h1>{pet.name}</h1>

                <div className='view-pet-details'>
                    <p><span>{translate('petDetails.type')}</span>{translate(`enums.type.${pet.type}`)}</p>
                    {pet.breed && <p><span>{translate('petDetails.breed')}</span>{pet.breed}</p>}
                    <p><span>{translate('petDetails.sex')}</span>{translate(`enums.sex.${pet.sex}`)}</p>
                    <p><span>{translate('petDetails.size')}</span>{translate(`enums.size.${pet.size}`)}</p>
                    {pet.birthDate && <p><span>{translate('petDetails.age')}</span>{formatAge(pet.birthDate)}</p>}
                    <p><span>{translate('petDetails.shelterDate')}</span>{new Date(pet.shelterDate).toLocaleDateString()}</p>
                    <p><span>{translate('petDetails.neutered')}</span>{translate(`enums.yesNo.${pet.isNeutered}`)}</p>
                    <p><span>{translate('petDetails.vaccinated')}</span>{translate(`enums.yesNo.${pet.isVaccinated}`)}</p>
                </div>

                <p className='view-pet-description'>{pet.description}</p>
            </div>
        </div>
    )
}

export default ViewPet