import { useEffect, useState } from 'react'

import { translate } from '@/i18n/translate.ts'

import './ViewPets.css'

import PetCard, { type PetData } from '../../components/PetCard/PetCard'
import { getErrorMessage } from '../../api/errors'
import { useAuth } from '../../auth/AuthContext'
import { useCart } from '../../cart/CartContext'

function ViewPets() {
    const [error, setError] = useState<string | null>(null)
    const [pets, setPets] = useState<PetData[]>([])
    const [loading, setLoading] = useState(true)
    const [favouritesIds, setFavouritesIds] = useState<Set<string>>(new Set())
    const { user, loading: authLoading } = useAuth()
    const { cartIds, addToCart } = useCart()

    useEffect(() => {
        async function fetchPets() {
            try {
                const response = await fetch('/api/pets/all')
                if (!response.ok) {
                    setError(await getErrorMessage(response))
                    return
                }
                const data = await response.json()
                setPets(data.map((item: any) => ({
                    id: String(item.id),
                    name: item.name,
                    birthDate: item.birthDate,
                    description: item.description,
                    imageUrl: item.imageUrl
                })))
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

    useEffect(() => {
        if (authLoading) return

        if (!user) {
            setFavouritesIds(new Set())
            return
        }
        async function fetchFavouritesIds() {
            try {
                const response = await fetch('/api/favourites/ids')
                if (!response.ok) {
                    setError(await getErrorMessage(response))
                    return
                }
                const data = await response.json()
                setFavouritesIds(new Set(data.map((id: any) => String(id))))
            }
            catch {
            }
        }
        fetchFavouritesIds()
    }, [user?.id, authLoading])

    async function handleAddToCart(id: string) {
        if (!user) {
            setError(translate('errors.MustBeLoggedIn'))
            return
        }
        const errorMessage = await addToCart(id)
        setError(errorMessage)
    }

    async function handleFavourite(id: string) {
        if (!user) {
            setError(translate('errors.MustBeLoggedIn'))
            return
        }
        const isFavourite = favouritesIds.has(id)
        try {
            const response = await fetch(`/api/favourites/${id}`, {
                method: isFavourite ? 'DELETE' : 'POST'
            })
            if (!response.ok) {
                setError(await getErrorMessage(response))
                return
            }
            setFavouritesIds(prev => {
                const newSet = new Set(prev)
                if (isFavourite)
                    newSet.delete(id)
                else
                    newSet.add(id)
                return newSet
            })
            setError(null)
        }
        catch {
            setError(translate('errors.NoConnection'))
        }
    }

    return (
        <div className='view-pets'>
            <div className='view-pets-title'>
                <h1>{translate('viewPets.title')}</h1>
            </div>

            {error && <p className='view-pets-error'>{error}</p>}

            <div className='view-pets-grid'>
                {loading ? (
                    <p className='view-pets-loading'>{translate('common.loading')}</p>
                ) : pets.length === 0 ? (
                    <p className='view-pets-empty'>{translate('home.noPets')}</p>
                ) : (
                    pets.map((pet, i) => (
                        <div
                            key={pet.id}
                            className='pet-appear'
                            style={{ animationDelay: `${Math.min(i, 12) * 80}ms` }}
                        >
                            <PetCard
                                id={pet.id}
                                name={pet.name}
                                birthDate={pet.birthDate}
                                description={pet.description}
                                imageUrl={pet.imageUrl}
                                isFavourite={favouritesIds.has(pet.id)}
                                isInCart={cartIds.has(pet.id)}
                                onFavourite={() => handleFavourite(pet.id)}
                                onAddToCart={() => handleAddToCart(pet.id)}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ViewPets