// routes.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from '../screen/Auth/LoginPage';
import AdminDashboardLayout from '../screen/Main/dashboard/analytics/AdminDashboardLayout';
import ProtectedRoute from './protectedRoute';
import HomePage from '../screen/Auth/HomePage';
import AboutPage from '../screen/Auth/AboutPage';
import ContactPage from '../screen/Auth/ContactPage';
import GetESticker from '../screen/Auth/GetESticker';

const Routes = () => {
    const pageRoutes = [
        {
            path: "",
            element: <HomePage />,
        },
        {
            path: "/home",
            element: <HomePage />,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/about",
            element: <AboutPage />,
        },
        {
            path: "/contact",
            element: <ContactPage />,
        },
        {
            path: "/get-e-sticker",
            element: <GetESticker />,
        },
    ];

    const adminRoutes = [
        {
            path: "admin",
            element: <ProtectedRoute />,
            children: [
                {
                    element: <AdminDashboardLayout />,
                    children: [
                        {
                            path: "*",
                            element: <h1>Page not found</h1>,
                        },
                        // student details
                    ],
                },
            ],
        },
    ];

    const router = createBrowserRouter([
        ...pageRoutes,
        ...adminRoutes,
    ]);
    return <RouterProvider router={router} />;
};

export default Routes;