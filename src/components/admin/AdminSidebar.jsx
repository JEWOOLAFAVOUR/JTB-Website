import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, LayoutDashboard, Users, LogOut, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { logoutUser } from '../../api/auth';

const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
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

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleSignOut = async () => {
        await logoutUser();
        navigate('/login');
    };

    const NavItem = ({ item }) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
            <Link to={item.path} onClick={() => setIsMobileOpen(false)}>
                <motion.div
                    whileHover={{ x: 5 }}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg cursor-pointer ${isActive
                        ? 'bg-green-600 text-white'
                        : 'hover:bg-green-50 text-gray-700'
                        }`}
                >
                    <Icon size={16} className="min-w-[20px] mr-4" />
                    {!isCollapsed && (
                        <span className="transition-opacity duration-200 whitespace-nowrap">
                            {item.title}
                        </span>
                    )}
                </motion.div>
            </Link>
        );
    };

    return (
        <>
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                        className="fixed inset-0 bg-black md:hidden z-30"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={{
                    width: isCollapsed ? '4rem' : '16rem'
                }}
                className={`fixed top-0 left-0 z-40 h-screen bg-white border-r shadow-sm
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 transition-transform duration-300`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                        {!isCollapsed && (
                            <h2 className="text-xl font-bold text-green-600 whitespace-nowrap">
                                JTB-SIRTS
                            </h2>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`hidden md:flex ${isCollapsed ? 'mx-auto' : 'ml-auto'}`}
                            onClick={toggleSidebar}
                        >
                            <motion.div
                                animate={{ rotate: isCollapsed ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </motion.div>
                        </Button>
                    </div>

                    <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                        {menuItems.map((item) => (
                            <NavItem key={item.title} item={item} />
                        ))}
                    </nav>

                    <div className="p-4 border-t">
                        <Button
                            variant="ghost"
                            className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700"
                            onClick={handleSignOut}
                        >
                            <LogOut size={20} className="min-w-[20px]" />
                            {!isCollapsed && (
                                <span className="transition-opacity duration-200">
                                    Logout
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

export default AdminSidebar;

// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, LayoutDashboard, Users, LogOut, Menu } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { logoutUser } from '../../api/auth';

// const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const menuItems = [
//         {
//             title: 'Dashboard',
//             icon: LayoutDashboard,
//             path: '/admin/dashboard'
//         },
//         {
//             title: 'Customers',
//             icon: Users,
//             path: '/admin/customers'
//         }
//     ];

//     const toggleSidebar = () => {
//         setIsCollapsed(!isCollapsed);
//     };

//     const handleSignOut = async () => {
//         await logoutUser();
//         navigate('/login');
//     };

//     const NavItem = ({ item }) => {
//         const isActive = location.pathname === item.path;
//         const Icon = item.icon;

//         return (
//             <Link to={item.path} onClick={() => setIsMobileOpen(false)}>
//                 <motion.div
//                     whileHover={{ x: 5 }}
//                     className={`flex items-center space-x-4 px-4 py-3 rounded-lg cursor-pointer ${isActive
//                         ? 'bg-green-600 text-white'
//                         : 'hover:bg-green-50 text-gray-700'
//                         }`}
//                 >
//                     <Icon size={20} />
//                     {!isCollapsed && (
//                         <span className="transition-opacity duration-200">
//                             {item.title}
//                         </span>
//                     )}
//                 </motion.div>
//             </Link>
//         );
//     };

//     return (
//         <>
//             {/* Mobile Menu Button */}
//             {/* <Button
//                 variant="ghost"
//                 className="md:hidden fixed top-12 left-4 z-50 "
//                 onClick={toggleMobile}
//             >
//                 <Menu size={24} />
//             </Button> */}

//             {/* Mobile Overlay */}
//             <AnimatePresence>
//                 {isMobileOpen && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 0.5 }}
//                         exit={{ opacity: 0 }}
//                         onClick={() => setIsMobileOpen(false)}
//                         className="fixed inset-0 bg-black md:hidden z-30"
//                     />
//                 )}
//             </AnimatePresence>

//             {/* Sidebar */}

//             <motion.aside
//                 initial={false}
//                 animate={{
//                     width: isCollapsed ? '0.5rem' : '16rem'
//                 }}
//                 className={`fixed top-0 left-0 z-40 h-screen bg-white border-r shadow-sm
//                     ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
//                     md:translate-x-0 transition-transform duration-300`}
//             >
//                 <div className="flex flex-col h-full">
//                     {/* Header */}
//                     <div className="flex items-center justify-between p-4 border-b">
//                         {!isCollapsed && (
//                             <h2 className="text-xl font-bold text-green-600">
//                                 JTB-SIRTS
//                             </h2>
//                         )}
//                         <Button
//                             variant="ghost"
//                             size="sm"
//                             className="hidden md:flex ml-auto"
//                             onClick={toggleSidebar}
//                         >
//                             <motion.div
//                                 animate={{ rotate: isCollapsed ? 180 : 0 }}
//                                 transition={{ duration: 0.3 }}
//                             >
//                                 <ChevronLeft className="h-5 w-5" />
//                             </motion.div>
//                         </Button>
//                     </div>

//                     {/* Navigation */}
//                     <nav className="flex-1 overflow-y-auto p-4 space-y-2">
//                         {menuItems.map((item) => (
//                             <NavItem key={item.title} item={item} />
//                         ))}
//                     </nav>

//                     {/* Footer */}
//                     <div className="p-4 border-t">
//                         <Button
//                             variant="ghost"
//                             className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700"
//                             onClick={() => handleSignOut()}
//                         >
//                             <LogOut size={20} />
//                             {!isCollapsed && (
//                                 <span className="transition-opacity duration-200">
//                                     Logout
//                                 </span>
//                             )}
//                         </Button>
//                     </div>
//                 </div>
//             </motion.aside>
//         </>
//     );
// };

// export default AdminSidebar;