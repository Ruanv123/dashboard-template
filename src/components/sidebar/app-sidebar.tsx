"use client";

import {
  BoxIcon,
  EclipseIcon,
  HelpCircle,
  HomeIcon,
  LogOutIcon,
  Settings2,
  ShoppingBagIcon,
  TagIcon,
  User,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
      icon: ShoppingBagIcon,
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
      title: "Pedidos",
      url: "#",
      icon: BoxIcon,
      items: [
        {
          title: "Todos os Pedidos",
          url: "/pedidos",
        },
        {
          title: "Pedidos Pendentes",
          url: "#",
        },
        {
          title: "Histórico de Pedidos",
          url: "#",
        },
      ],
    },
    {
      title: "Clientes",
      url: "#",
      icon: User,
      items: [
        {
          title: "Lista de Clientes",
          url: "/clients",
        },
        {
          title: "Avaliações",
          url: "/reviews",
        },
      ],
    },
    {
      title: "Cupons e Descontos",
      url: "#",
      icon: TagIcon,
      items: [
        {
          title: "Cupons de Desconto",
          url: "/discount",
        },
        {
          title: "Criar Cupom",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Configurações Gerais",
          url: "#",
        },
        {
          title: "Métodos de Pagamento",
          url: "#",
        },
        {
          title: "Configurações do Sistema",
          url: "#",
        },
      ],
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <HelpCircle />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOutIcon />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
