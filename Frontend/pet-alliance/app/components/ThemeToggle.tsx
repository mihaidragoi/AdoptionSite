"use client";

import {useEffect, useState} from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    }, []);

    function toggle(){
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
    }

    return (
        <button onClick={toggle} aria-label="Toggle theme" className="navbar__icon-btn" type="button">
            {theme === "dark" ? "🌞" : "🌙"}
        </button>
    );
}