import React,{ createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loggingIn, setLoggingIn] = useState(false); // State for "Logging in..." message



    // Load user from localStorage when app starts
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Save user to localStorage when user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // Login Function
    const login = (userData) => {
        setUser(userData);
        setLoggingIn(true);
    };

    // Logout Function
    const logout = () => {
        setUser(null);
        setLoggingIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout,loggingIn }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for easy access
export const useAuth = () => useContext(AuthContext);
