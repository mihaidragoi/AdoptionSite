"use client";

import { useState, useEffect} from "react";

const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeBcKRQdG84UzE8Q8I2dYHAdw5YU6yaQEBqDadwvuFgg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGUpU2wYNw-z5awTOfABRghxynES23ykNNs_ybsi-lQg&s=10",
    "https://preview.redd.it/what-are-the-most-common-pets-in-your-country-v0-xdkc5quunhlg1.png?width=640&crop=smart&auto=webp&s=0426c1cea7a97f158aab3227029ecf2c7a880390"
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
        }, 3000); 

        return () => clearInterval(timer);
    }, []); 

    const handleGoToPrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    };

    const handleGoToNext = () => {
        setCurrentIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1);
    };

return (
        <div className="carousel-container">
            {images.map((img, index) => (
                <img key={index} src={img} alt={`Slide ${index + 1}`} className={`carousel-image ${index === currentIndex ? "active" : ""}`} />
            ))}

            <button onClick={handleGoToPrevious} className="carousel-button prev">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={handleGoToNext} className="carousel-button next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            <div className="carousel-dots">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
                        aria-label={`Mergi la imaginea ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
