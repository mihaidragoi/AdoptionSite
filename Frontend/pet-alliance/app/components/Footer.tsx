import Link from "next/link";
import "../styles/footer.css";
import {links} from "../utils/links";

export default function Footer() {

  return (
    <footer className="footer">
      <div className="footer-container container">
        <p className="footer-logo">🐾 PetAlliance</p>
        <ul className="footer-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <p className="footer-copyright">
          © 2026 PetAlliance. Every pet deserves a home.
        </p>
      </div>
    </footer>
  );
}