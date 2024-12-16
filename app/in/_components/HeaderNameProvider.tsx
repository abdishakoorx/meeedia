import { ModeToggle } from '@/components/mode-toggler';

interface HeaderProps {
  headerName: string;
}

const Header: React.FC<HeaderProps> = ({ headerName }) => {
  return (
    <header className="
      w-full 
      flex 
      justify-between 
      items-center 
      p-4 
      bg-white 
      dark:bg-gray-800 
      shadow-sm 
      border-b 
      border-gray-200 
      dark:border-gray-700
    ">
      <h1 className="
        text-2xl 
        font-semibold 
        text-gray-800 
        dark:text-gray-200
      ">
        {headerName}
      </h1>
      
      <ModeToggle />
    </header>
  );
};

export default Header;