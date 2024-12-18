import { ModeToggle } from '@/components/mode-toggler';
import CreateButton from './CreateButton';
import { SidebarOpen } from 'lucide-react';
import { useDashboard } from '../DashboardProvider';

interface HeaderProps {
  headerName: string;
}

const Header: React.FC<HeaderProps> = ({ headerName }) => {
  const { toggleSidebar } = useDashboard();

  return (
    <header className="
      w-full
      flex
      justify-between
      items-center
      p-4
      shadow-sm
      border-b
      border-gray-200
      dark:border-gray-700
    ">
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="
            lg:hidden
            text-gray-600 
            dark:text-gray-300
            hover:bg-gray-100
            dark:hover:bg-gray-700
            p-2
            rounded-lg
            transition-colors
          "
        >
          <SidebarOpen className="w-6 h-6" />
        </button>
        <h1 className="
          text-2xl
          font-semibold
          text-gray-800
          dark:text-gray-200
        ">
          {headerName}
        </h1>
      </div>
     
      <div className="flex items-center space-x-4">
        <CreateButton />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;