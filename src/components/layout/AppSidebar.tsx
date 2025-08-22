import { useState } from 'react';
import { 
  Home, 
  Sprout, 
  Users, 
  MapPin, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Plus
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAppSelector } from '@/store/hooks';

const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const ownerItems = [
    { title: 'Tableau de bord', url: '/dashboard', icon: Home },
    { title: 'Mes terres', url: '/mes-terres', icon: MapPin },
    { title: 'Cultivateurs', url: '/cultivateurs', icon: Users },
    { title: 'Messages', url: '/messages', icon: MessageSquare },
    { title: 'Statistiques', url: '/statistiques', icon: BarChart3 },
  ];

  const cultivatorItems = [
    { title: 'Tableau de bord', url: '/dashboard', icon: Home },
    { title: 'Terres disponibles', url: '/terres-disponibles', icon: Sprout },
    { title: 'Mes projets', url: '/mes-projets', icon: MapPin },
    { title: 'Messages', url: '/messages', icon: MessageSquare },
    { title: 'Statistiques', url: '/statistiques', icon: BarChart3 },
  ];

  const items = user?.role === 'cultivator' ? cultivatorItems : ownerItems;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = items.some((i) => isActive(i.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'hover:bg-sidebar-accent/50';

  return (
    <Sidebar
      className={collapsed ? 'w-14' : 'w-60'}
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/ajouter-terre" className="text-primary hover:bg-primary/10">
                    <Plus className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Ajouter une terre</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/parametres" className={getNavCls}>
                    <Settings className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Paramètres</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;