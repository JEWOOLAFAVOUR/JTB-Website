import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import LoginPage from '../screen/Auth/LoginPage';
import Dashboard from '../screen/Admin/Dashboard';
import Customers from '../screen/Admin/Customers';
import AddCustomer from '../screen/Admin/AddCustomer';
import AdminLayout from '../components/admin/AdminLayout';
import HomePage from '../screen/Auth/HomePage';
import AboutPage from '../screen/Auth/AboutPage';
import ContactPage from '../screen/Auth/ContactPage';
import GetESticker from '../screen/Auth/GetESticker';
import IndividualPurchase from '../screen/Auth/IndividualPurchase';

// ScrollToTop component integrated within Routes
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

// Wrapper component to include ScrollToTop
const RouteWrapper = ({ Component }) => (
    <>
        <ScrollToTop />
        <Component />
    </>
);

const Routes = () => {
    const pageRoutes = [
        {
            path: "",
            element: <RouteWrapper Component={HomePage} />,
        },
        {
            path: "/login",
            element: <RouteWrapper Component={LoginPage} />,
        },
        {
            path: "/about",
            element: <RouteWrapper Component={AboutPage} />,
        },
        {
            path: "/contact",
            element: <RouteWrapper Component={ContactPage} />,
        },
        {
            path: "/get-e-sticker",
            element: <RouteWrapper Component={GetESticker} />,
        },
        {
            path: "/individual",
            element: <RouteWrapper Component={IndividualPurchase} />,
        },
    ];

    const adminRoutes = [
        {
            path: "admin",
            element: <AdminLayout />,
            children: [
                {
                    path: "dashboard",
                    element: <Dashboard />,
                },
                {
                    path: "customers",
                    element: <Customers />,
                },
                {
                    path: "customers/add",
                    element: <AddCustomer />,
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

