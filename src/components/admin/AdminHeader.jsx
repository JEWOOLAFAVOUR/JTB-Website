import React, { useState } from 'react';
import { Menu, LogOut, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../api/auth';

const AdminHeader = ({ onMenuToggle, title }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="fixed top-0 right-0 left-0 md:left-64 bg-white shadow-md z-30 transition-all duration-300">
            <div className="px-4 py-3 flex justify-between items-center">
                {/* Hamburger Menu */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        className="md:hidden"
                        onClick={onMenuToggle}
                    >
                        <Menu size={24} />
                    </Button>

                    {/* Page Title */}
                    <h1 className="text-xl font-semibold text-gray-700">{title}</h1>
                </div>

                {/* User Dropdown */}
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-10 w-10 rounded-full"
                            onClick={() => setIsOpen(true)}
                        >
                            <User size={24} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator /> */}
                        <DropdownMenuItem
                            className="cursor-pointer text-red-600 focus:text-red-600"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default AdminHeader;