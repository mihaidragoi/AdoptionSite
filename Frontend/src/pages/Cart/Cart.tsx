import {translate} from "../../i18n/translate";
import './Cart.css'

import CartItem, {type CartItemData} from "@/components/CartItem/CartItem";
import {useEffect, useState} from "react";
import { getErrorMessage } from "@/api/errors";

import { useCart } from "@/cart/CartContext";

function Cart() {
    const [cartItems, setCartItems] = useState<CartItemData[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const {removeFromCart} = useCart()

    useEffect(() => {
        async function fetchCart() {
            try {
                const response = await fetch('/api/cart')
                if(!response.ok){
                    setError(await getErrorMessage(response))
                    return
                }

                const data = await response.json()

                const items: CartItemData[] = data.map((item: any) => ({
                    id: String(item.id),
                    name: item.name,
                    birthDate: item.birthDate,
                    description: item.description,
                    imageUrl: item.imageUrl
                }))

                setCartItems(items)
            }
            catch{
                setError(translate('errors.NoConnection'))
            }
            finally{
                setLoading(false)
            }
            
        }
        fetchCart()
    },[])

    async function handleRemoveFromCart(id: string) {
        const errorMessage = await removeFromCart(id)
        if(errorMessage) {
            setError(errorMessage)
            return
        }
        setCartItems(items => items.filter(item => item.id !== id))
        setError(null)
    }

    return (
        <main className="cart-page">
            <h1 className="cart-title">{translate('cart.title')}</h1>

            {error && <p className="cart-error">{error}</p>}

            {loading ? (
                <p className="cart-loading">{translate('common.loading')}</p>
            ) : cartItems.length === 0 ? (
                <p className="cart-empty">{translate('cart.empty')}</p>
            ) : ( 
                <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveFromCart}
                    />
                ))}
                </div>
            )}
        </main>
    )
}

export default Cart