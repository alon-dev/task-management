import type { ReactNode } from 'react';
import { ThemeToggle } from '../theme/ThemeToggle';
import './AppShell.css';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <div className="app-shell__brand">Workflow</div>
        <nav className="app-shell__nav">
          <span className="app-shell__nav-item app-shell__nav-item--active">Today</span>
          <span className="app-shell__nav-item">This Week</span>
          <span className="app-shell__nav-item">All Tasks</span>
          <span className="app-shell__nav-item">Backlog</span>
        </nav>
        <div className="app-shell__sidebar-footer">
          <ThemeToggle />
        </div>
      </aside>
      <main className="app-shell__main">{children}</main>
    </div>
  );
}
