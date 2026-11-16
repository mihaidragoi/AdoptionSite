import { useEffect, useState } from 'react'

import './Slideshow.css'

type SlideshowProps = {
    images: string[];
    interval?: number;
};

export default function Slideshow({ images, interval = 4000 }: SlideshowProps) {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (images.length < 2) return

        const id = setInterval(() => {
            setCurrent((i) => (i + 1) % images.length)
        }, interval)

        return () => clearInterval(id)
    }, [images.length, interval, current])

    return (
        <div className='slideshow'>
            {images.map((src, i) => (
                <img
                    key={src}
                    className={`slideshow-slide ${i === current ? 'active' : ''}`}
                    src={src}
                    alt={`Slide ${i + 1}`}
                />
            ))}

            <div className='slideshow-dots'>
                {images.map((_, i) => (
                    <button
                        key={i}
                        className={`slideshow-dot ${i === current ? 'active' : ''}`}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
