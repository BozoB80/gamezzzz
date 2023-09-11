import { Globe, LayoutDashboard, PanelLeftOpen, Store, Swords } from "lucide-react";

export const sidebarLinks = [
  {
    icon: LayoutDashboard,
    route: "/admin",
    label: "Dashboard",
  },
  {
    icon: PanelLeftOpen,
    route: "/admin/billboards",
    label: "Billboards",
  },
  {
    icon: Globe,
    route: "/admin/categories",
    label: "Categories",
  },
  {
    icon: Swords,
    route: "/admin/games",
    label: "Games",
  },  
  {
    icon: Store,
    route: "/admin/orders",
    label: "Orders",
  },  
];

export const mobileNavLinks = [
  {
    icon: LayoutDashboard,
    route: "/",
    label: "Discover",
  },
  {
    icon: Swords,
    route: "/games",
    label: "Games",
  },  
  {
    icon: Globe,
    route: "/categories",
    label: "Categories",
  },  
  {
    icon: Store,
    route: "/orders",
    label: "Orders",
  },  
];