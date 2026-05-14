"use client";
import axios from "axios"

export async function register({username, email , password}) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
            username, email , password
        }, {
            withCredentials: true
        })

    return response.data

    } catch (error) {
        console.log("error:", error)
        throw error
    }
}

export async function login({identifier , password}) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            identifier , password
        }, {
            withCredentials: true
        })

    return response.data
    
    } catch (error) {
        console.log("error:", error)
        throw error
    }
}

export async function logout() {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout` , {
            withCredentials : true
        });

        return response.data

    } catch (error) {
        console.log("error:", error);
    }
}

export async function getme() {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-me` , {
            withCredentials : true
        });

        return response.data
        
    } catch (error) {
        console.log("error:", error);
    }
}
