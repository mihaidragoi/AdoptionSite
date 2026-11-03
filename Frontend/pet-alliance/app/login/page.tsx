"use client";

import { useState } from "react";
import Link from "next/link";
import "../styles/authentification.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  }

  return (
    <div className="auth">
      <div className="auth__wrapper">
        <p className="auth__brand">🐾 PetAlliance</p>

        <section className="auth__card">
          <h1 className="auth__title">Welcome back</h1>
          <p className="auth__subtitle">Log in to your PetAlliance account.</p>

          <form className="auth__form" onSubmit={handleSubmit} noValidate>
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="auth__error" role="alert">{error}</p>}

            <button type="submit" className="auth__submit">Log in</button>
          </form>

          <p className="auth__footer">
            No account yet? <Link href="/register">Sign up</Link>
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