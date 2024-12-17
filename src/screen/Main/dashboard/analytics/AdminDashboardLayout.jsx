import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "../../../../components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger
} from "@/components/ui/menubar";
import { AlignJustify } from "lucide-react";
import { useSelector } from "react-redux";

export default function AdminDashboardLayout() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // State for toggling sidebar
    const userChannel = useSelector(state => state?.mid?.channel)

    const user = {
        name: "John Doe",
        avatarUrl: "https://img.freepik.com/free-vector/young-man-with-glasses-illustration_1308-174706.jpg?t=st=1734190535~exp=1734194135~hmac=8102a282ee9bc59d5132b2ddbb37883426e34fdef39fee1b69bfa6b554761234&w=740"
    }; // Example user
    const channel = { name: "Computer Science Channel", id: "#34445555" }; // Example channel

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        navigate('/login')
    }

    return (
        <SidebarProvider>
            <div className="flex w-full h-screen overflow-hidden">
                {/* Sidebar */}
                <AppSidebar isOpen={isOpen} />

                {/* Main Content */}
                <div className="flex-1 relative overflow-y-scroll noscrollbar">
                    {/* Header */}
                    <header className="sticky top-0 z-10 bg-white shadow-md px-4 sm:px-6 py-4 flex items-center justify-between">
                        {/* Toggle Sidebar Button for Small Screens */}
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                className="sm:hidden"
                                onClick={toggleSidebar}
                            >
                                {/* <AlignJustify className="h-6 w-6" /> */}
                                <SidebarTrigger />
                            </Button>

                            {/* Channel Name and ID */}
                            <div className="hidden sm:flex items-center space-x-2">
                                <span className="text-xl font-semibold">{userChannel?.name}</span>
                                <span className="text-sm text-muted-foreground">{channel.id}</span>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center space-x-4">
                            <span className="hidden sm:block text-lg font-medium text-muted-foreground">
                                {`${userChannel?.rep?.firstname} ${userChannel?.rep?.lastname}`}
                            </span>
                            <Avatar>
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>

                            {/* User Menubar (Replaced Menu) */}
                            <Menubar className="hidden sm:block">
                                <MenubarMenu>
                                    <MenubarTrigger>
                                        <AlignJustify className="h-6 w-6" />
                                    </MenubarTrigger>
                                    <MenubarContent>
                                        <MenubarItem onClick={() => navigate("/admin/profile")}>
                                            Profile
                                            <MenubarShortcut>P</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem>
                                            Settings
                                            <MenubarShortcut>S</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem onClick={() => handleLogout()} >
                                            Logout
                                            <MenubarShortcut>Q</MenubarShortcut>
                                        </MenubarItem>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>
                        </div>
                    </header>

                    {/* Main Content Area */}
                    <main className="p-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}




// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { AppSidebar } from '../../../../components/app-sidebar'
// import { SidebarProvider } from "@/components/ui/sidebar";


// export default function AdminDashboardLayout() {
//     const [isOpen, setIsOpen] = useState(false); // State for toggling sidebar (if needed)

//     return (
//         <SidebarProvider>
//             <div className="flex w-full h-screen overflow-hidden">
//                 <AppSidebar />
//                 <div className="flex-1 relative overflow-y-scroll noscrollbar">
//                     <Outlet />
//                 </div>
//             </div>
//         </SidebarProvider>
//     );
// }
