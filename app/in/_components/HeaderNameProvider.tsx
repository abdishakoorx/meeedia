import { ModeToggle } from "@/components/mode-toggler";
import CreateButton from "./CreateButton";
import { SidebarOpen } from "lucide-react";
import { useDashboard } from "../DashboardProvider";

interface HeaderProps {
  headerName: string;
}

const Header: React.FC<HeaderProps> = ({ headerName }) => {
  const { toggleSidebar } = useDashboard();

  return (
    <header className="w-full flex justify-between items-center p-4 md:px-10 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-700 dark:text-gray-300 p-2 rounded-lg"
        >
          <SidebarOpen className="w-6 h-6" />
        </button>
        <h1 className="md:text-xl font-bold md:font-semibold text-gray-800 dark:text-gray-200">
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
