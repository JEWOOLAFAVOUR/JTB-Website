import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from '../../../../components/app-sidebar'
import { SidebarProvider } from "@/components/ui/sidebar";


export default function AdminDashboardLayout() {
    const [isOpen, setIsOpen] = useState(false); // State for toggling sidebar (if needed)

    return (
        <SidebarProvider>
            <div className="flex w-full h-screen overflow-hidden">
                <AppSidebar />
                <div className="flex-1 relative overflow-y-scroll noscrollbar">
                    <Outlet />
                </div>
            </div>
        </SidebarProvider>
    );
}
