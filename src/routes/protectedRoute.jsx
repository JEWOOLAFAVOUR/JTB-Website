import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from '../zustand/useAuthStore';

export default function ProtectedRoute() {
    // const isAuthenticated = true; // Replace this with real authentication logic

    const { token } = useAuthStore.getState()


    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
