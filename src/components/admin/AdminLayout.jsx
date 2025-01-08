import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar isMobileOpen={isOpen} setIsMobileOpen={setIsOpen} />
            <div className="flex-1 ml-0.5 md:ml-64 transition-all duration-300">
                <main className="p-0.5">
                    {/* Header */}
                    <AdminHeader onMenuToggle={setIsOpen} />
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
