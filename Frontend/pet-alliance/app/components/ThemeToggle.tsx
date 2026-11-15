"use client";

import {useEffect, useState} from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const isDarkMode = theme === "dark";

    useEffect(() => {
        const currentTheme = document.documentElement.dataset.theme;
        setTheme(currentTheme === "dark" ? "dark" : "light");
    }, []);

    function toggle(){
        const newTheme = isDarkMode ? "light" : "dark";
        setTheme(newTheme);
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem("theme", newTheme);
    }

    return (
        <button onClick={toggle} aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"} className="nav-icon-btn" type="button">
            {isDarkMode ? "🌞" : "🌙"}
        </button>
    );
}