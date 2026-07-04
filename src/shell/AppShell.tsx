import type { ReactNode } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ThemeToggle } from '../theme/ThemeToggle';
import type { ViewKey } from './types';

const NAV_ITEMS: { key: ViewKey; label: string }[] = [
  { key: 'today', label: 'להיום' },
  { key: 'week', label: 'לשבוע' },
  { key: 'all', label: 'כל המשימות' },
  { key: 'backlog', label: 'בקלוג' },
];

interface AppShellProps {
  activeView: ViewKey;
  onSelectView: (view: ViewKey) => void;
  children: ReactNode;
}

export function AppShell({ activeView, onSelectView, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <Sidebar side="right">
        <SidebarHeader className="px-4 py-3 text-lg font-bold">לוח המשימות</SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="px-2">
            {NAV_ITEMS.map((item) => (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton
                  isActive={item.key === activeView}
                  onClick={() => onSelectView(item.key)}
                >
                  {item.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center border-b px-6 py-3">
          <SidebarTrigger />
        </header>
        <main className="flex-1 px-10 py-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
