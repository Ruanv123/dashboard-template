"use client";

import {
  BoxIcon,
  CheckSquare2Icon,
  EclipseIcon,
  HomeIcon,
  Settings2,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  nav: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: "Products",
      url: "#",
      icon: CheckSquare2Icon,
      items: [
        {
          title: "Lista de Produtos",
          url: "/products",
        },
        {
          title: "Adicionar Produto",
          url: "#",
        },
        {
          title: "Categorias",
          url: "/categories",
        },
      ],
    },
    {
      title: "Products",
      url: "/products",
      icon: BoxIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <EclipseIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">ECOMM PLATAFORM</span>
                <span className="truncate text-xs">FREE</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavMain items={data.nav} />
      </SidebarContent>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
