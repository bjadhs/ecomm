import { useState } from 'react';
import { Outlet } from 'react-router';
import { useUser } from '@clerk/clerk-react';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/Navbar';
import PageLoader from '../../components/admin/PageLoader';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isLoaded } = useUser();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    if (!isLoaded) {
        return <PageLoader />;
    }


    return (
        <div className="flex min-h-screen bg-(--bg-main) font-sans text-(--text-main) transition-colors duration-300">
            {/* Sidebar overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-(--bg-card) border-r border-(--border-color) transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
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
    );
};

export default AdminLayout;
