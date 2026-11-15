import "../styles/home.css";
import Link from "next/link";
import Carousel from "../components/Carousel";
import "../styles/buttons.css";

export default function Home() {
  return (
    <div className="home-container container">
        <h1 className="home-title">
          Welcome to PetAlliance!
        </h1>
        
        <p className="home-subtitle">
          Find your perfect companion and give them a loving home.
        </p>

        <Carousel />

        <div className="home-actions">
          <Link href="/animals" className="btn-primary">
            Browse Animals 🐾
          </Link>
          <Link href="/donate" className="btn-secondary">
            Support Us 💖
          </Link>
        </div>

        <div className="home-grid">
          <div className="home-card">
            <h3>🐾 Adoptions</h3>
            <p>
              Browse available pets and start your adoption journey today.
            </p>
          </div>

          <div className="home-card">
            <h3>🩺 Services & Care</h3>
            <p>
              Discover pet care services, vaccinations, and support options.
            </p>
          </div>
        </div>
     </div>
  );
}
