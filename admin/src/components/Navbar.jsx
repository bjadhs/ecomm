import { useState } from "react";
import { User, Menu as MenuIcon, LogOut } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";

const Navbar = ({ onMenuClick }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { user } = useUser();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-slate-500 hover:text-slate-600 lg:hidden transition-colors"
                >
                    <MenuIcon size={24} />
                </button>
                <h1>Welcome, {user?.firstName}</h1>

            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <div
                    className="relative"
                    onMouseEnter={() => setShowProfileMenu(true)}
                    onMouseLeave={() => setShowProfileMenu(false)}
                >
                    <button className="flex items-center gap-2 p-1 pl-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                            <User size={20} className="text-slate-500" />
                        </div>
                        <span className="text-sm font-medium hidden sm:inline text-slate-700">Admin User</span>
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 top-full pt-1 w-48 z-50">
                            <div className="bg-white border border-slate-200 rounded-lg shadow-lg py-1 overflow-hidden">
                                <a href="#" className="dropdown-item">Profile</a>
                                <a href="#" className="dropdown-item">Settings</a>
                                <hr className="my-1 border-slate-100" />
                                <SignOutButton>
                                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
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