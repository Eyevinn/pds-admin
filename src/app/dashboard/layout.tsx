import NavigationBar from '@/components/navigation/NavigationBar';
import Sidebar from '@/components/navigation/SideBar';
import { MenuItems } from '@/constants/menu';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: LayoutProps) {
  const menuItems = [...MenuItems];

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className="flex flex-row min-h-0 flex-1">
        <Sidebar menuItems={menuItems} />
        <main className="flex flex-col flex-1 overflow-y-scroll bg-background shadow-inner p-4 lg:p-12 xl:p-20">
          {children}
        </main>
      </div>
    </div>
  );
}
