import {translate} from "../../i18n/translate";
import {formatAge} from "../../utils/FormatAge";
import './CartItem.css'

export type CartItemData = {
    id: string;
    name: string;
    birthDate: string | null;
    description: string;
    imageUrl: string | null;
}

type CartItemProps = {
    item: CartItemData;
    onRemove: (id: string) => void;
}

function CartItem({ item, onRemove }: CartItemProps) {
    return (
        <div className="cart-item">
            {item.imageUrl && (
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            )}
            <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-description">{item.description}</p>
                {item.birthDate && (
                    <p className="cart-item-age">
                        {translate('cart.age')}: {formatAge(item.birthDate)}
                    </p>
                )}
            </div>
            <button className="cart-item-remove-button" onClick={() => onRemove(item.id)}>
                {translate('cart.remove')}
            </button>
        </div>
    )
}
export default CartItem