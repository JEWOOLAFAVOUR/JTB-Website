import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, LayoutDashboard, Users, LogOut, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            path: '/admin/dashboard'
        },
        {
            title: 'Customers',
            icon: Users,
            path: '/admin/customers'
        }
    ];

    const NavItem = ({ item }) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
            <Link to={item.path}>
                <motion.div
                    whileHover={{ x: 5 }}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-lg cursor-pointer ${isActive
                            ? 'bg-green-600 text-white'
                            : 'hover:bg-green-50 text-gray-700'
                        }`}
                >
                    <Icon size={20} />
                    {!isCollapsed && <span>{item.title}</span>}
                </motion.div>
            </Link>
        );
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                className="md:hidden fixed top-4 left-4 z-50"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <Menu size={24} />
            </Button>

            {/* Sidebar */}
            <AnimatePresence mode="wait">
                <motion.aside
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    exit={{ x: -100 }}
                    className={`
            fixed top-0 left-0 z-40 h-screen bg-white border-r
            ${isCollapsed ? 'w-20' : 'w-64'}
            ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 transition-all duration-300
          `}
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            {!isCollapsed && (
                                <h2 className="text-xl font-bold text-green-600">JTB-SIRTS</h2>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden md:flex"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                                <ChevronLeft
                                    className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''
                                        }`}
                                />
                            </Button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                            {menuItems.map((item) => (
                                <NavItem key={item.title} item={item} />
                            ))}
                        </nav>

                        {/* Footer */}
                        <div className="p-4 border-t">
                            <Button
                                variant="ghost"
                                className="w-full flex items-center space-x-2 text-red-600 hover:text-red-700"
                                onClick={() => {
                                    // Add logout logic here
                                }}
                            >
                                <LogOut size={20} />
                                {!isCollapsed && <span>Logout</span>}
                            </Button>
                        </div>
                    </div>
                </motion.aside>
            </AnimatePresence>
        </>
    );
};

export default AdminSidebar;

