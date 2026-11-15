"use client";

import { useState } from "react";
import Link from "next/link";
import "../styles/auth.css";
import "../styles/buttons.css";

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
      <div className="auth-container">
        <p className="auth-logo">🐾 PetAlliance</p>

        <section className="auth-card">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Log in to your PetAlliance account.</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button type="submit" className="btn-primary">Log in</button>
          </form>

          <p className="auth-signup">
            No account yet? <Link href="/register">Sign up</Link>
          </p>
        </section>

        <ul className="auth-features">
          <li>🔍 Browse animals</li>
          <li>📝 Apply online</li>
          <li>💬 Contact shelters</li>
        </ul>

      </div>
    </div>
  );
}