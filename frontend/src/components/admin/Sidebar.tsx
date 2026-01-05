import { NavLink } from "react-router";
import { LayoutDashboard, Users, ShoppingCart, Package, X } from "lucide-react";

interface SidebarProps {
    closeSidebar: () => void;
}

const Sidebar = ({ closeSidebar }: SidebarProps) => {
    const navItems = [
        { label: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
        { label: "Customers", path: "/admin/customer", icon: <Users size={20} /> },
        { label: "Orders", path: "/admin/order", icon: <ShoppingCart size={20} /> },
        { label: "Products", path: "/admin/product", icon: <Package size={20} /> },
    ];

    return (
        <div className="flex flex-col h-full bg-(--bg-card)">
            <div className="h-16 flex items-center justify-between px-6 border-b border-(--border-color) lg:border-none">
                <span className="text-xl font-bold text-(--color-primary) tracking-tight uppercase">Ecom Admin</span>
                <button
                    onClick={closeSidebar}
                    className="p-2 lg:hidden text-(--text-muted) hover:text-(--text-main)"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => closeSidebar()}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                        ${isActive
                                ? 'bg-(--color-primary) text-white shadow-lg shadow-(--color-primary)/20'
                                : 'text-(--text-muted) hover:bg-(--bg-hover) hover:text-(--text-main)'}
                        `}
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
