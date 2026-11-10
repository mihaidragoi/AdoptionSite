import Link from "next/link";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__brand">🐾 PetAlliance</p>
        <ul className="footer__links">
          <li><Link href="/animals">Animals</Link></li>
          <li><Link href="/donate">Donate</Link></li>
          <li><Link href="/login">Log in</Link></li>
        </ul>
        <p className="footer__copy">
          © 2026 PetAlliance. Every pet deserves a home.
        </p>
      </div>
    </footer>
  );
}