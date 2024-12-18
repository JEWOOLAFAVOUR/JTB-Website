import {
  Home,
  BookText,
  ChartNoAxesCombined,
  Users,
  HandCoins,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Analytics",
    url: "/admin/analytics", // Matches your route path
    icon: ChartNoAxesCombined,
  },
  {
    title: "Courses",
    url: "/admin/course", // Add a placeholder for Settings
    icon: BookText,
  },
  {
    title: "Past-Questions",
    url: "/admin/past-question", // Add a placeholder for Settings
    icon: BookText,
  },
  {
    title: "Student",
    url: "/admin/student", // Add a placeholder for Settings
    icon: Users,
  },
  {
    title: "Transaction",
    url: "/admin/transaction", // Add a placeholder for Settings
    icon: HandCoins,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center space-x-2 ${
                          isActive ? "bg-gray-200" : ""
                        }`
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
