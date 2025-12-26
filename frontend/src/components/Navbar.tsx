import { useState, useCallback, useEffect } from 'react';
import { LogOut, Moon, Sun, Settings, UserCircle, Home, ShoppingBag, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { cartApi } from '../lib/api';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = localStorage.getItem('theme');
    return theme
      ? theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const { user } = useUser();
  const location = useLocation();
  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.getCart,
  });

  const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const isActive = (path: string) => location.pathname === path;

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
    <header className='h-16 bg-(--bg-card) border-b border-(--border-color) flex items-center justify-between px-4 lg:px-8 transition-colors duration-300 sticky top-0 z-40 shadow-sm'>
      <div className='flex items-center gap-8'>
        <h1 className='text-(--text-main) font-semibold text-lg hidden sm:block'>
          Welcome,{' '}
          <span className='font-bold text-(--color-primary)'>
            {user?.firstName
              ? user.firstName.charAt(0).toUpperCase() +
                user.firstName.slice(1).toLowerCase()
              : 'User'}
          </span>
        </h1>

        {/* Navigation Links */}
        <nav className='flex items-center gap-1 md:gap-3'>
          <Link
            to='/home'
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
              isActive('/home')
                ? 'bg-(--bg-hover) text-(--text-main)'
                : 'text-(--text-muted) hover:text-(--text-main) hover:bg-(--bg-hover)'
            }`}
          >
            <Home className='w-5 h-5' />
            <span className='hidden md:inline text-sm font-medium'>Home</span>
          </Link>

          <Link
            to='/orders'
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
              isActive('/orders')
                ? 'bg-(--bg-hover) text-(--text-main)'
                : 'text-(--text-muted) hover:text-(--text-main) hover:bg-(--bg-hover)'
            }`}
          >
            <ShoppingBag className='w-5 h-5' />
            <span className='hidden md:inline text-sm font-medium'>Orders</span>
          </Link>

          <Link
            to='/cart'
            className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
              isActive('/cart')
                ? 'bg-(--bg-hover) text-(--text-main)'
                : 'text-(--text-muted) hover:text-(--text-main) hover:bg-(--bg-hover)'
            }`}
          >
            <ShoppingCartIcon className='w-5 h-5' />
            <span className='hidden md:inline text-sm font-medium'>Cart</span>
            {cartItemCount > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                {cartItemCount > 9 ? '9+' : cartItemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>

      <div className='flex items-center justify-between gap-2 md:gap-4'>
        <button
          onClick={toggleTheme}
          className='p-2 text-(--text-muted) hover:text-(--text-main) transition-all duration-200 rounded-full hover:bg-(--bg-hover) group'
          aria-label='Toggle theme'
        >
          {isDarkMode ? (
            <Sun
              size={24}
              className='group-hover:rotate-180 transition-transform duration-500'
            />
          ) : (
            <Moon
              size={24}
              className='group-hover:rotate-180 transition-transform duration-500'
            />
          )}
        </button>
        <div
          className='relative'
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <button className='flex items-center gap-2 p-2 pr-3 hover:bg-(--bg-hover) rounded-lg transition-all duration-200 border border-transparent hover:border-(--border-color) group'>
            <div className='w-9 h-9 rounded-full bg-(--color-primary) bg-opacity-10 flex items-center justify-center overflow-hidden border border-(--border-color) group-hover:border-(--color-primary) group-hover:bg-opacity-20 transition-all duration-200'>
              <UserCircle size={20} className='text-(--color-primary)' />
            </div>
            <span className='text-sm font-medium hidden sm:inline text-(--text-main)'>
              {user?.firstName
                ? user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1).toLowerCase()
                : 'Profile'}
            </span>
          </button>

          {showProfileMenu && (
            <div className='absolute right-0 top-full pt-2 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
              <div className='bg-(--bg-card) border border-(--border-color) rounded-xl shadow-xl overflow-hidden backdrop-blur-sm bg-opacity-95'>
                {/* User Info Section */}
                <div className='px-4 py-4 border-b border-(--border-color) bg-(--bg-hover) bg-opacity-30'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-(--color-primary) bg-opacity-20 flex items-center justify-center border border-(--color-primary) border-opacity-30'>
                      <UserCircle
                        size={24}
                        className='text-(--color-primary)'
                      />
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-(--text-main)'>
                        {user?.firstName && user?.lastName
                          ? `${
                              user.firstName?.[0]?.toUpperCase() +
                              user.firstName?.slice(1).toLowerCase()
                            } ${
                              user.lastName?.[0]?.toUpperCase() +
                              user.lastName?.slice(1).toLowerCase()
                            }`
                          : user?.firstName
                            ? user.firstName?.[0]?.toUpperCase() +
                              user.firstName?.slice(1).toLowerCase()
                            : 'User'}
                      </p>
                      <p className='text-xs text-(--text-muted) truncate'>
                        {user?.emailAddresses?.[0]?.emailAddress ||
                          'user@example.com'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className='py-2'>
                  <a
                    href='#'
                    className='flex items-center gap-3 px-4 py-2.5 text-sm text-(--text-main) hover:bg-(--bg-hover) transition-colors duration-150 group/item'
                  >
                    <UserCircle
                      size={18}
                      className='text-(--text-muted) group-hover/item:text-(--color-primary) transition-colors'
                    />
                    <span>My Profile</span>
                  </a>
                  <a
                    href='#'
                    className='flex items-center gap-3 px-4 py-2.5 text-sm text-(--text-main) hover:bg-(--bg-hover) transition-colors duration-150 group/item'
                  >
                    <Settings
                      size={18}
                      className='text-(--text-muted) group-hover/item:text-(--color-primary) transition-colors'
                    />
                    <span>Settings</span>
                  </a>
                </div>

                {/* Divider */}
                <div className='border-t border-(--border-color)' />

                {/* Logout */}
                <div className='py-2'>
                  <SignOutButton>
                    <button className='flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 group/logout'>
                      <LogOut
                        size={18}
                        className='group-hover/logout:translate-x-1 transition-transform'
                      />
                      <span className='font-medium'>Logout</span>
                    </button>
                  </SignOutButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
