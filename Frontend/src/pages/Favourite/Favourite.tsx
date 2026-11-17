import {translate} from "../../i18n/translate";
import FavouriteItem, { type FavouriteItemData } from '@/components/FavouriteItem/FavouriteItem'

import {useState} from "react";

import './Favourite.css'

const testFavourites: FavouriteItemData[] = [
    {
        id: '1',
        name: 'Cora',
        birthDate: '2016-06-10',
        description: 'Shih Tzu blândă și foarte afectuoasă. Adoră să fie periată și se înțelege bine cu alți câini.',
        imageUrl: 'https://placedog.net/400/300?id=11',
    },
    {
        id: '2',
        name: 'Rex',
        birthDate: '2021-03-12',
        description: 'Ciobănesc german jucăuș și energic. Se înțelege bine cu copiii și iubește plimbările lungi.',
        imageUrl: 'https://placedog.net/400/300?id=22',
    },
    {
        id: '3',
        name: 'Luna',
        birthDate: '2026-06-01',
        description: 'Pui de Spitz alb, curios și jucăuș. Vaccinat și deparazitat, caută o familie activă.',
        imageUrl: 'https://placedog.net/400/300?id=33',
    },
    {
        id: '4',
        name: 'Max',
        birthDate: '2019-11-23',
        description: 'Labrador blând și ascultător, perfect pentru o familie activă. Are nevoie de curte sau de multă mișcare.',
        imageUrl: 'https://placedog.net/400/300?id=44',
    },
    {
        id: '5',
        name: 'Bella',
        birthDate: '2023-01-15',
        description: 'Pisică liniștită și curată, obișnuită cu viața la apartament. Sterilizată.',
        imageUrl: 'https://cataas.com/cat?width=400&height=300',
    },
]

function Favourite() {
    const [favouriteItems, setFavouriteItems] = useState(testFavourites)

    function removeItem(id: string) {
        setFavouriteItems((i)=> i.filter(item => item.id !== id))
    }

    function addToCart(id: string) {
        console.log(`Adding item with id ${id} to cart`);
    }

    return (
        <main className="favourite-page">
            <h1 className="favourite-title">{translate('favourite.title')}</h1>
            {favouriteItems.length === 0 ? (
                <p className="favourite-empty">{translate('favourite.empty')}</p>
            ) : (
                <div className="favourite-items">
                    {favouriteItems.map((item) => (
                        <FavouriteItem
                            key={item.id}
                            item={item}
                            onRemove={removeItem}
                            onAddToCart={addToCart}   
                        />
                    ))}
                </div>
            )}
        </main>
    )
}

export default Favourite
