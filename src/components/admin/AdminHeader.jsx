import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminHeader = ({ onMenuToggle, title }) => {
    return (
        <header className="w-full bg-white shadow-md px-4 py-3 flex justify-between items-center mb-4">
            {/* Hamburger Menu */}
            <Button
                variant="ghost"
                className="md:hidden"
                onClick={onMenuToggle}
            >
                <Menu size={24} />
            </Button>

            {/* Page Title */}
            <h1 className="text-xl font-semibold text-gray-700">{title}</h1>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
                {/* Notification Icon */}
                <Button variant="ghost" className="relative">
                    <Bell size={24} />
                    {/* Notification Badge */}
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
                </Button>

                {/* User Profile Icon */}
                <Button variant="ghost">
                    <User size={24} />
                </Button>
            </div>
        </header>
    );
};

export default AdminHeader;
