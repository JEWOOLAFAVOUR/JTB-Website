import React, { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// Create Theme Context
const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => { }
});

// Theme Provider Component
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("ui-theme");
        return savedTheme || "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("ui-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Theme Toggle Button Component
export function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full"
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

export default ThemeToggle;