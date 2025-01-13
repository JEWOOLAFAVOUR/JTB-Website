import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import LoginPage from '../screen/Auth/LoginPage';
import LoginForRegistration from '../screen/Auth/LoginForRegistration';
import Dashboard from '../screen/Admin/Dashboard';
import Customers from '../screen/Admin/Customers';
import CustomerDetails from '../screen/Admin/CustomerDetails';
import EditCustomer from '../screen/Admin/EditCustomer';
import AddCustomer from '../screen/Admin/AddCustomer';
import AdminLayout from '../components/admin/AdminLayout';
import HomePage from '../screen/Auth/HomePage';
import AboutPage from '../screen/Auth/AboutPage';
import ContactPage from '../screen/Auth/ContactPage';
import GetESticker from '../screen/Auth/GetESticker';
import IndividualPurchase from '../screen/Auth/IndividualPurchase';
import VerifySticker from '../screen/Verify/VerifySticker';
import VerifySuccess from '../screen/Verify/VerifySuccess';
import VerifyError from '../screen/Verify/VerifyError';
import RegisterCustomerDetails from '../screen/Verify/RegisterCustomerDetails';
import ProtectedRoute from './protectedRoute';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

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
            path: "/home",
            element: <RouteWrapper Component={HomePage} />,
        },
        {
            path: "/login",
            element: <RouteWrapper Component={LoginPage} />,
        },
        {
            path: "/login-for-registration",
            element: <RouteWrapper Component={LoginForRegistration} />,
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
        {
            path: "/verify",
            element: <RouteWrapper Component={VerifySticker} />,
        },
        {
            path: "/verify-sirts",
            element: <RouteWrapper Component={VerifySticker} />,
        },
        {
            path: "/verify/success",
            element: <RouteWrapper Component={VerifySuccess} />,
        },
        {
            path: "/verify/error",
            element: <RouteWrapper Component={VerifyError} />,
        },
        {
            path: "/register-customer",
            element: <RouteWrapper Component={RegisterCustomerDetails} />,
        },
    ];

    const adminRoutes = [
        {
            path: "admin",
            element: <ProtectedRoute />,
            children: [
                {
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
                            path: "customers/:id",
                            element: <CustomerDetails />,
                        },
                        {
                            path: "customers/edit/:id",
                            element: <EditCustomer />,
                        },
                        {
                            path: "customers/add",
                            element: <AddCustomer />,
                        },
                    ]
                }
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

