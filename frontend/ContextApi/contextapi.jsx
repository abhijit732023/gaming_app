import React,{ createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);




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
    };

    // Logout Function
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout,status }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for easy access
export const useAuth = () => useContext(AuthContext);
