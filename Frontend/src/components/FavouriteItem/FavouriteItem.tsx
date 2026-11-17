import {translate} from "../../i18n/translate";
import {formatAge} from "../../utils/FormatAge";

import './FavouriteItem.css'

export type FavouriteItemData = {
    id: string;
    name: string;
    birthDate: string;
    description: string;
    imageUrl: string;
}   

type FavouriteItemProps = {
    item: FavouriteItemData;
    onRemove: (id: string) => void;
    onAddToCart: (id: string) => void;
}

function FavouriteItem({ item, onRemove, onAddToCart }: FavouriteItemProps) {
    return (
        <div className="favourite-item">
            <img src={item.imageUrl} alt={item.name} className="favourite-item-image" />
            <div className="favourite-item-details">
                <h3 className="favourite-item-name">{item.name}</h3>
                <p className="favourite-item-description">{item.description}</p>
                <p className="favourite-item-age">{translate('cart.age')}: {formatAge(item.birthDate)}</p>
            </div>
            <div className="favourite-item-actions">
                <button className="favourite-item-add-to-cart-button" onClick={() => onAddToCart(item.id)}>
                    {translate('pet.addToCart')}
                </button>
                <button className="favourite-item-remove-button" onClick={() => onRemove(item.id)}>
                    {translate('cart.remove')}
                </button>
            </div>
        </div>
    )
}

export default FavouriteItem