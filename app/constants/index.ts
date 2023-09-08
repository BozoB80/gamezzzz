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