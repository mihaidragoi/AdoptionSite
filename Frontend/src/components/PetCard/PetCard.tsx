import { translate } from '@/i18n/translate.ts'
import { formatAge } from '@/utils/FormatAge.ts'

import heartIcon from '@/assets/navbar/heart.svg'
import cartIcon from '@/assets/navbar/cart.svg'

import './PetCard.css'

type PetCardProps = {
    name: string;
    birthDate: string;
    description: string;
    imageUrl: string;

    onFavourite?: () => void;
    onAddToCart?: () => void;
};


export default function PetCard({ name, birthDate, description, imageUrl, onFavourite, onAddToCart }: PetCardProps) {
    return (
        <div className='pet-card'>
            <img src={imageUrl} alt={name} />
            <h3>{name}</h3>
            <h4>{formatAge(birthDate)}</h4>
            <p>{description}</p>
            
            <div className='pet-card-actions'>
                <button className='pet-card-favourite' onClick={onFavourite} aria-label={translate('pet.favourite')} title={translate('pet.favourite')}>
                    <img src={heartIcon} alt='' />
                </button>

                <button className='pet-card-view-details' title={translate('pet.viewDetails')}>
                    {translate('pet.viewDetails')}
                </button>

                <button className='pet-card-add-to-cart' onClick={onAddToCart} aria-label={translate('pet.addToCart')} title={translate('pet.addToCart')}>
                    <img src={cartIcon} alt='' />
                </button>
            </div>

        </div>
    );
}
