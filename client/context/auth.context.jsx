"use client";
import { createContext, useState } from "react";
import { getme } from "@/services/auth.api.js";
import { useEffect } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const userData = await getme();
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <authContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </authContext.Provider>
    );
};