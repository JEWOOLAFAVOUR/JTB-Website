import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="pt-16 md:pt-0 transition-all duration-300">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;

