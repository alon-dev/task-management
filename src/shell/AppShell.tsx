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

const NAV_ITEMS = ['Today', 'This Week', 'All Tasks', 'Backlog'] as const;

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="px-4 py-3 text-lg font-bold">Workflow</SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="px-2">
            {NAV_ITEMS.map((item, index) => (
              <SidebarMenuItem key={item}>
                <SidebarMenuButton isActive={index === 0}>{item}</SidebarMenuButton>
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
