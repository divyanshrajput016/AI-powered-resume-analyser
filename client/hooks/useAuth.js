"use client";
import { useContext } from "react";
import { authContext } from "@/context/auth.context";
import {login , register , logout , getme} from "@/services/auth.api.js"


export const useAuth = () => {
    const context = useContext(authContext);
    const {user , setUser , loading , setLoading} = context;

    const handleLogin = async({identifier , password}) => { 
        try {
        setLoading(true)
        const data = await login({identifier , password});
        setUser(data.user);
        } catch (error) {
            console.log("Login error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async({username, email, password}) => {

        try {
            setLoading(true);
            const data = await register({username, email, password});
            setUser(data.user);
        } catch (error) {
            console.log("Registration error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async() => {
        try {
            setLoading(true);
            await logout();
            setUser(null);
        } catch (error) {
            console.log("Logout error:", error);
        } finally {
            setLoading(false);
        }
    }
    return { user, setUser, loading, setLoading, handleLogin, handleRegister, handleLogout };
}