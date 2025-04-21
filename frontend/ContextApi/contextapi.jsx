import React, { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

// Expiry time in milliseconds (1 minute = 60,000 ms)
const EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to get user from LocalStorage and check expiry
    const getUser = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) return null;

        const currentTime = new Date().getTime();
        if (currentTime > storedUser.expiry) {
            localStorage.removeItem("user"); // Remove expired user
            return null;
        }
        return storedUser;
    };

    // Load user when app starts
    useEffect(() => {
        const storedUser = getUser();
        setUser(storedUser);
    }, []);

    // Auto logout after expiry
    useEffect(() => {
        if (user) {
            const timeLeft = user.expiry - new Date().getTime();
            const timeout = setTimeout(() => {
                setUser(null);
                localStorage.removeItem("user");
            }, timeLeft);

            return () => clearTimeout(timeout); // Cleanup on unmount
        }
    }, [user]);

    // Login Function
    const login = (userData) => {
        const userWithExpiry = {
            ...userData,
            expiry: new Date().getTime() + EXPIRY_TIME, // 1 min expiry
        };
        setUser(userWithExpiry);
        localStorage.setItem("user", JSON.stringify(userWithExpiry));
    };

    // Logout Function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for easy access
export const useAuth = () => useContext(AuthContext);
