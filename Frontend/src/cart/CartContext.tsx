import {createContext, useContext,useEffect, useState} from "react";
import { getErrorMessage } from "@/api/errors";
import { useAuth } from "@/auth/AuthContext";
import  {translate}  from "@/i18n/translate.ts";

type CartContextValue = {
    cartIds: Set<string>
    count: number
    addToCart: (id: string) => Promise<string | null>
    removeFromCart: (id: string) => Promise<string | null>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({children}: {children: React.ReactNode}) {
    const [cartIds, setCartIds] = useState<Set<string>>(new Set())
    const {user, loading: authLoading} = useAuth()

    useEffect(() => {
        if(authLoading) return
        if(!user) {
            setCartIds(new Set())
            return
        }
        async function fetchCartIds() {
            try {
                const response = await fetch('/api/cart/ids')
                if(!response.ok) return
                const data = await response.json()
                setCartIds(new Set(data.map((id: any) => String(id))))
            } catch (error) {
            }
        }
        fetchCartIds()
    }, [user?.id, authLoading])

    async function addToCart(id: string){
        try {
            const response = await fetch(`/api/cart/${id}`, {
                method: 'POST'
            })
            if(!response.ok){
                return await getErrorMessage(response)
            }
            setCartIds(prev => new Set(prev).add(id))
            return null
        } catch (error) {
            return translate('errors.NoConnection')
        }
    }

    async function removeFromCart(id: string){
        try {
            const response = await fetch(`/api/cart/${id}`, {
                method: 'DELETE'
            })
            if(!response.ok){
                return await getErrorMessage(response)
            }
            setCartIds(prev => {
                const newSet = new Set(prev)
                newSet.delete(id)
                return newSet
            })
            return null
        } catch (error) {
            return translate('errors.NoConnection')
        }
    }

    return (
        <CartContext.Provider value={{cartIds, count: cartIds.size, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if(!ctx) throw new Error('useCart must be used inside CartProvider')
    return ctx
}