import { useState, useCallback, useEffect } from "react";
import { User, Menu as MenuIcon, LogOut, Moon, Sun } from "lucide-react";
import { SignOutButton, useUser, useAuth } from "@clerk/clerk-react";

const Navbar = ({ onMenuClick }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const theme = localStorage.getItem('theme');
        return theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
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
        <header className="h-16 bg-[var(--bg-card)] border-b border-[var(--border-color)] flex items-center justify-between px-4 lg:px-8 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-[var(--text-muted)] hover:text-[var(--text-main)] lg:hidden transition-colors"
                >
                    <MenuIcon size={24} />
                </button>
                <h1 className="text-[var(--text-main)] font-medium">
                    Welcome, {user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase() : ''}
                </h1>

            </div>

            <div className="flex items-center justify-between gap-2 md:gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors rounded-full hover:bg-[var(--bg-hover)]"
                >
                    {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <div
                    className="relative"
                    onMouseEnter={() => setShowProfileMenu(true)}
                    onMouseLeave={() => setShowProfileMenu(false)}
                >
                    <button className="flex items-center gap-2 p-1 pl-2 hover:bg-[var(--bg-hover)] rounded-lg transition-colors border border-transparent hover:border-[var(--border-color)]">
                        <div className="w-8 h-8 rounded-full bg-[var(--bg-hover)] flex items-center justify-center overflow-hidden border border-[var(--border-color)]">
                            <User size={20} className="text-[var(--text-muted)]" />
                        </div>
                        <span className="text-sm font-medium hidden sm:inline text-[var(--text-main)]">Admin User</span>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 top-full pt-1 w-48 z-50">
                            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-lg py-1 overflow-hidden">
                                <a href="#" className="dropdown-item">Profile</a>
                                <a href="#" className="dropdown-item">Settings</a>
                                <hr className="my-1 border-[var(--border-color)]" />
                                <SignOutButton>
                                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
    )
}

export default Navbar