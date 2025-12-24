import { useState, useCallback, useEffect } from 'react';
import { User, LogOut, Moon, Sun } from 'lucide-react';
import { SignOutButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme
      ? theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const { user } = useUser();

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <header className='h-16 bg-(--bg-card) border-b border-(--border-color)] flex items-center justify-between px-4 lg:px-8 transition-colors duration-00'>
      <div className='flex items-center gap-4'>
        <h1 className='text-(--text-main)] font-medum'>
          Welcome,{' '}
          <span>
            {user?.firstName
              ? user.firstName.charAt(0).toUpperCase() +
                user.firstName.slice(1).toLowerCase()
              : ''}
          </span>{' '}
          to Ecom
        </h1>
      </div>

      <div className='flex items-center justify-between gap-2 md:gap-4'>
        <button
          onClick={toggleTheme}
          className='p-2 text-(--text-muted)] hover:text-(--text-main)] transition-colors rounded-full hover:bg-(--bg-hovr)]'
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <div
          className='relative'
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <button className='flex items-center gap-2 p-1 pl-2 hover:bg-(--bg-hover)] rounded-lg transition-colors border border-transparent hover:border-(--border-colo)]'>
            <div className='w-8 h-8 rounded-full bg-(--bg-hover)] flex items-center justify-center overflow-hidden border border-(--border-colo)]'>
              <User size={20} className='text-(--text-muted)' />
            </div>
            <span className='text-sm font-medium hidden sm:inline text-(--text-mai)]'>
              {user?.firstName
                ? user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1).toLowerCase()
                : ''}
            </span>
          </button>

          {showProfileMenu && (
            <div className='absolute right-0 top-full pt-1 w-48 z-50'>
              <div className='bg-(--bg-card)] border border-(--border-color)] rounded-lg shadow-lg py-1 overflow-hiden'>
                <a href='#' className='dropdown-item'>
                  Profile
                </a>
                <a href='#' className='dropdown-item'>
                  Settings
                </a>
                <hr className='my-1 border-(--border-color)' />
                <SignOutButton>
                  <button className='flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'>
                    <LogOut size={16} />
                    Logout
                  </button>
                </SignOutButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
