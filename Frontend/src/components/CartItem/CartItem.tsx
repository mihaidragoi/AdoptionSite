import {translate} from "../../i18n/translate";
import './CartItem.css'

export type CartItemData = {
    id: string;
    name: string;
    birthDate: string;
    description: string;
    imageUrl: string;
}

type CartItemProps = {
    item: CartItemData;
    onRemove: (id: string) => void;
}

function CartItem({ item, onRemove }: CartItemProps) {
    return (
        <div className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-description">{item.description}</p>
            </div>
            <button className="cart-item-remove-button" onClick={() => onRemove(item.id)}>
                {translate('cart.remove')}
            </button>
        </div>
    )
}
export default CartItem