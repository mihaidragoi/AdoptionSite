"use client";

import {useState} from "react";
import Link from "next/link";
import "../styles/navbar.css";
import ThemeToggle from "./ThemeToggle";

const links = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/animals",
        label: "Animals"
    },
    {
        href: "/donate",
        label: "Donate"
    }
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="navbar">
            <div className="navbar__inner">
                <Link href="/" className="navbar__brand">
                    🐾 PetAlliance
                </Link>
                <button
                    className="navbar__toggle"
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    >
                    ☰
                </button>
        <nav className={`navbar__nav ${isOpen ? "navbar__nav--open" : ""}`}>

          <ul className="navbar__links">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <Link href="/login" className="navbar__cta">Log in</Link>
        </nav>

      </div>

    </header>
  );
}