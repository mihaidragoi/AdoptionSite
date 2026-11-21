import {translate} from "../../i18n/translate";
import FavouriteItem, { type FavouriteItemData } from '@/components/FavouriteItem/FavouriteItem'

import {useEffect, useState} from "react";
import { getErrorMessage } from "@/api/errors";

import {useCart} from "@/cart/CartContext";

import './Favourite.css'


function Favourite() {
    const [favouriteItems, setFavouriteItems] = useState<FavouriteItemData[]>([])

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    const {addToCart} = useCart()

    useEffect(() => {
        async function fetchFavourites() {
            try {
                const response = await fetch('/api/favourites')
                if (!response.ok) {
                    setError(await getErrorMessage(response))
                    return
                }

                const data = await response.json()

                const items: FavouriteItemData[] = data.map((item: any) => ({
                    id: String(item.id),
                    name: item.name,
                    birthDate: item.birthDate,
                    description: item.description,
                    imageUrl: item.imageUrl
                }))

                setFavouriteItems(items)
            }
            catch {
                setError(translate('errors.NoConnection'))
            }
            finally {
                setLoading(false)
            }
        }
        fetchFavourites()
    }, [])

    async function handleRemoveFromFavourites(id: string) {
        try {
            const response = await fetch(`/api/favourites/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                setError(await getErrorMessage(response))
                return
            }
            setFavouriteItems(items => items.filter(item => item.id !== id))
            setError(null)
        }
        catch {
            setError(translate('errors.NoConnection'))
        }
    }

    async function handleAddToCart(id: string) {
        const errorMessage = await addToCart(id)
        if(errorMessage) {
            setError(errorMessage)
            return
        }
        await handleRemoveFromFavourites(id)
    }

    return (
        <main className="favourite-page">
            <h1 className="favourite-title">{translate('favourite.title')}</h1>
            {error && <p className="favourite-error">{error}</p>}
            {loading ? (
                <p className="favourite-loading">{translate('common.loading')}</p>
            ) : (
                favouriteItems.length === 0 ? (
                    <p className="favourite-empty">{translate('favourite.empty')}</p>
                ) : (
                    <div className="favourite-items">
                        {favouriteItems.map((item) => (
                            <FavouriteItem
                                key={item.id}
                                item={item}
                                onRemove={handleRemoveFromFavourites}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                )
            )}
        </main>
    )
}

export default Favourite
