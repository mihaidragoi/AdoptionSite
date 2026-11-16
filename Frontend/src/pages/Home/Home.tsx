import slide0 from '@/assets/home/slideshow0.jpg'
import slide1 from '@/assets/home/slideshow1.jpg'
import slide2 from '@/assets/home/slideshow2.jpg'

import { translate } from '@/i18n/translate.ts'

import './Home.css'

import PetCard from '../../components/PetCard/PetCard';
import Slideshow from '../../components/Slideshow/Slideshow';

const slides = [slide1, slide0, slide2];

const pets = [
    { id: 1, name: 'Cora', birthDate: '2016-05-20', description: 'This is my dog.', imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/048/775/730/small/cute-shih-tzu-dog-in-pink-sweatshirt-and-sunglasses-on-pastel-background-photo.jpg' },
    { id: 2, name: 'Rex', birthDate: '2006-01-20', description: 'Very playful.', imageUrl: 'https://i.pinimg.com/1200x/15/d3/24/15d324caa9e530424a9d3d8c2c867924.jpg' },
    { id: 3, name: 'Luna', birthDate: '2026-05-20', description: 'Loves naps.', imageUrl: 'https://i.pinimg.com/736x/3a/3d/4b/3a3d4b04d70cc293fadf195b4e1a7bcb.jpg' },
    { id: 4, name: 'Luna', birthDate: '2026-05-20', description: 'Loves naps.', imageUrl: 'https://i.pinimg.com/736x/3a/3d/4b/3a3d4b04d70cc293fadf195b4e1a7bcb.jpg' },
    { id: 5, name: 'Luna', birthDate: '2026-05-20', description: 'Loves naps.', imageUrl: 'https://i.pinimg.com/736x/3a/3d/4b/3a3d4b04d70cc293fadf195b4e1a7bcb.jpg' },
];

function Home() {
    return (
        <div className='home'>
            <div className='motive'>
                <Slideshow images={slides} />

                <div className='motive-text'>
                    <h1>{translate('home.title')}</h1>
                    <p>{translate('home.welcome')}</p>
                </div>
            </div>

            <div className='recently-added'>
                <div className='recently-added-title'>
                    <h2>{translate('home.recentlySheltered')}</h2>
                </div>

                <div className='recently-added-pets'>
                    {pets.map((pet, i) => (
                        <div
                            key={pet.id}
                            className='pet-appear'
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <PetCard {...pet} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
