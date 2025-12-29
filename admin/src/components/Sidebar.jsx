import { NavLink } from "react-router";
import { LayoutDashboard, Users, ShoppingCart, Package, X } from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
    const navItems = [
        { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { label: "Customers", path: "/customer", icon: <Users size={20} /> },
        { label: "Orders", path: "/order", icon: <ShoppingCart size={20} /> },
        { label: "Products", path: "/product", icon: <Package size={20} /> },
    ];

    return (
        <div className="flex flex-col h-full bg-[var(--bg-card)]">
            <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border-color)] lg:border-none">
                <span className="text-xl font-bold text-[var(--color-primary)] tracking-tight uppercase">Ecom Admin</span>
                <button
                    onClick={closeSidebar}
                    className="btn-icon lg:hidden"
                >
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={`/admin${item.path}`}
                        onClick={() => closeSidebar()}
                        className={({ isActive }) => `
                            sidebar-link
                        ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}
                        `}
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </nav>

        </div>
    )
}

export default Sidebar