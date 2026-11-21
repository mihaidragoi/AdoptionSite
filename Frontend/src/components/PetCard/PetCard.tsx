import { translate } from '@/i18n/translate.ts'
import { formatAge } from '@/utils/FormatAge.ts'

import heartIcon from '@/assets/navbar/heart.svg'
import heartFilledIcon from '@/assets/navbar/heart-solid-full.svg'
import cartIcon from '@/assets/navbar/cart.svg'

import './PetCard.css'

export type PetData = {
    id: string;
    name: string;
    birthDate: string | null;
    description: string;
    imageUrl: string | null;
}

type PetCardProps = {
    name: string;
    birthDate: string | null;
    description: string;
    imageUrl: string | null;
    isFavourite?: boolean;
    isInCart?: boolean;

    onFavourite?: () => void;
    onAddToCart?: () => void;
};


export default function PetCard({ name, birthDate, description, imageUrl, isFavourite, isInCart, onFavourite, onAddToCart }: PetCardProps) {
    return (
        <div className='pet-card'>
            {imageUrl && (<img src={imageUrl} alt={name} />)}
            <h3>{name}</h3>
            {birthDate && <h4>{formatAge(birthDate)}</h4>}
            <p>{description}</p>
            
            <div className='pet-card-actions'>
                <button className='pet-card-favourite' onClick={onFavourite} aria-label={translate('pet.favourite')} title={translate('pet.favourite')}>
                    <img src={isFavourite ? heartFilledIcon : heartIcon} alt='' />
                </button>

                <button className='pet-card-view-details' title={translate('pet.viewDetails')}>
                    {translate('pet.viewDetails')}
                </button>

                <button className='pet-card-add-to-cart' onClick={onAddToCart} disabled={isInCart} aria-label={translate('pet.addToCart')} title={translate('pet.addToCart')}>
                    <img src={cartIcon} alt='' />
                </button>
            </div>

        </div>
    );
}
