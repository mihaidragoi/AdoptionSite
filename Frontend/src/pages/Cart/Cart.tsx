import {translate} from "../../i18n/translate";
import './Cart.css'

import CartItem, {type CartItemData} from "@/components/CartItem/CartItem";
import {useState} from "react";

const testItems: CartItemData[] = [
    {
        id: '1',
        name: 'Rex',
        birthDate: '2021-03-12',
        description: 'Ciobănesc german jucăuș și energic. Se înțelege bine cu copiii și iubește plimbările lungi.',
        imageUrl: 'https://placedog.net/400/300?id=1',
    },
    {
        id: '2',
        name: 'Luna',
        birthDate: '2022-07-01',
        description: 'Câine liniștit și afectuos, obișnuit cu viața la apartament. Vaccinat și sterilizat.',
        imageUrl: 'https://placedog.net/400/300?id=2',
    },
    {
        id: '3',
        name: 'Max',
        birthDate: '2019-11-23',
        description: 'Labrador blând și ascultător, perfect pentru o familie activă. Are nevoie de curte sau de multă mișcare.',
        imageUrl: 'https://placedog.net/400/300?id=3',
    },
]

function Cart() {
    const [cartItems, setCartItems] = useState<CartItemData[]>(testItems)

    function removeItem(id: string) {
        setCartItems((i)=> i.filter(item => item.id !== id))
    }

    return (
        <main className="cart-page">
            <h1 className="cart-title">{translate('cart.title')}</h1>
            {cartItems.length === 0 ? (
                <p className="cart-empty">{translate('cart.empty')}</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onRemove={removeItem}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}

export default Cart