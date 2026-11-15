"use client";

import { useState } from "react";
import Link from "next/link";
import "../styles/auth.css";
import "../styles/buttons.css";

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
      <div className="auth-container">
        <p className="auth-logo">🐾 PetAlliance</p>

        <section className="auth-card">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join PetAlliance and find your companion.</p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className="auth-error" role="alert">{error}</p>}

            <button type="submit" className="btn-primary">Sign up</button>
          </form>

          <p className="auth-signup">
            Already have an account? <Link href="/login">Log in</Link>
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