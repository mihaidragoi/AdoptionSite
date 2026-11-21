import slide0 from '@/assets/home/slideshow0.jpg'
import slide1 from '@/assets/home/slideshow1.jpg'
import slide2 from '@/assets/home/slideshow2.jpg'

import { translate } from '@/i18n/translate.ts'

import './Home.css'

import PetCard, {type PetData} from '../../components/PetCard/PetCard';
import Slideshow from '../../components/Slideshow/Slideshow';
import { getErrorMessage } from '../../api/errors'
import {useEffect, useState } from 'react'

import {useAuth} from "../../auth/AuthContext";
import { useCart } from '../../cart/CartContext';


const slides = [slide1, slide0, slide2];


function Home() {
    const [error, setError] = useState<string | null>(null)
    const [pets, setPets] = useState<PetData[]>([])
    const [loading, setLoading] = useState(true)
    const [favouritesIds, setFavouritesIds] = useState<Set<string>>(new Set())
    const { user, loading: authLoading } = useAuth()
    const {cartIds, addToCart} = useCart()

    useEffect(() => {
        async function fetchPets() {
            try {
                const response = await fetch('/api/pets')
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
        if(authLoading) return

        if(!user) {
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
    if(!user) {
        setError(translate('errors.MustBeLoggedIn'))
        return
    }

    const errorMessage = await addToCart(id)
    setError(errorMessage)
}

    async function handleFavourite(id: string) {
    if(!user) {
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
    catch 
    {
        setError(translate('errors.NoConnection'))
    }
}
    
    return (
        <div className='home'>
            <div className='motive'>
                <Slideshow images={slides} />

                <div className='motive-text'>
                    <h1>{translate('home.title')}</h1>
                    <p>{translate('home.welcome')}</p>
                </div>
            </div>

            <div className='recently-added'>
                <div className='recently-added-title'>
                    <h2>{translate('home.recentlySheltered')}</h2>
                </div>

                {error && <p className="home-error">{error}</p>}

                <div className='recently-added-pets'>
                    {loading ? (
                        <p className="home-loading">{translate('common.loading')}</p>
                    ) : pets.length === 0 ? (
                        <p className="home-empty">{translate('home.noPets')}</p>
                    ) : (
                        pets.map((pet, i) => (
                            <div
                            key={pet.id}
                            className='pet-appear'
                            style={{ animationDelay: `${i * 100}ms` }}
                            >   
                            <PetCard
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
        </div>
    )
}

export default Home
