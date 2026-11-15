"use client";

import {useState} from "react";
import Link from "next/link";
import "../styles/navbar.css";
import ThemeToggle from "./ThemeToggle";
import { links } from "../utils/links";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    function closeMenu() {
        setIsOpen(false);
    }

    return (
        <header className="navbar">
            <div className="nav-container container">
                <Link href="/" className="nav-logo">
                    🐾 PetAlliance
                </Link>
                <button className="nav-button" aria-label="Toggle menu" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)} type="button">
                    ☰
                </button>

        <nav className={`nav-menu ${isOpen ? "nav-menu--open" : ""}`}>

          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />
          
          <Link href="/login" className="nav-cta" onClick={closeMenu}>Log in</Link>
        </nav>

      </div>
    </header>
  );
}