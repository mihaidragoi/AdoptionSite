"use client";

import { useState } from "react";
import Link from "next/link";
import "../styles/authentification.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  }

  return (
    <div className="auth">
      <div className="auth__wrapper">
        <p className="auth__brand">🐾 PetAlliance</p>

        <section className="auth__card">
          <h1 className="auth__title">Create account</h1>
          <p className="auth__subtitle">Join PetAlliance and find your companion.</p>

          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            <div className="auth__field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="auth__field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth__field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="auth__field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className="auth__error" role="alert">{error}</p>}

            <button type="submit" className="auth__submit">Sign up</button>
          </form>

          <p className="auth__footer">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </section>

        <ul className="auth__perks">
          <li>🔍 Browse animals</li>
          <li>📝 Apply online</li>
          <li>💬 Contact shelters</li>
        </ul>
      </div>
    </div>
  );
}