import { useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen bg-[var(--bg-main)] font-sans text-[var(--text-main)] transition-colors duration-300">
            {/* Sidebar overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[var(--bg-card)] border-r border-[var(--border-color)] transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Navbar onMenuClick={toggleSidebar} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout;