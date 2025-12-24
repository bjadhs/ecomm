import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

const DashboardLayout = () => {
  return (
    <div className='flex min-h-screen bg-[var(--bg-main)] font-sans text-[var(--text-main)] transition-colors duration-300'>
      {/* Main Content Area */}
      <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        <Navbar />
        <main className='flex-1 overflow-y-auto p-4 md:p-6 lg:p-8'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
