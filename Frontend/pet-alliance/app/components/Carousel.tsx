"use client";

import { useEffect, useState} from "react";
import { images } from "../utils/images";
import "../styles/carousel.css";

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    function showNext(){
        setCurrentIndex((i) => (i + 1) % images.length);
    }

    function showPrevious(){
        setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    }

    useEffect(() => {
        const interval = setInterval(showNext, 5000);
        return () => clearInterval(interval);
    }, []);

return (
        <div className="carousel-container">
            {images.map((img, index) => (
                <img key={index} src={img} alt={`Animal Image ${index + 1}`} className={`carousel-image ${index === currentIndex ? "active" : ""}`} />
            ))}

            <button type="button" onClick={showPrevious} className="carousel-button prev">
                ‹
            </button>
            <button type="button" onClick={showNext} className="carousel-button next">
                ›
            </button>

            <div className="carousel-dots">
                {images.map((_, index) => (
                    <button
                        type="button"
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
                        aria-label={`Go to image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
