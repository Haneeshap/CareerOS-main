import { Sidebar } from '@/components/sidebar';
import { Topbar } from '@/components/topbar';

type AppShellProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export function AppShell({ children, title, description }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={title} description={description} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
