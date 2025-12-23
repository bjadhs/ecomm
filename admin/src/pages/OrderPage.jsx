import { useQuery } from "@tanstack/react-query";
import { orderApi } from "../lib/api";
import QueryState from "../components/QueryState";

const OrderPage = () => {

    const { data: orders = [], isLoading, error } = useQuery({
        queryKey: ['orders'],
        queryFn: orderApi.getAllOrders,
    })


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-[var(--text-main)]">Orders</h1>

            <QueryState
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading orders..."
            >
                <div className="bg-[var(--bg-card)] rounded-lg shadow-sm border border-[var(--border-color)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[var(--bg-hover)] border-b border-[var(--border-color)]">
                                <tr>
                                    <th className="table-head">Order ID</th>
                                    <th className="table-head">Customer</th>
                                    <th className="table-head">Status</th>
                                    <th className="table-head">Total</th>
                                    <th className="table-head">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)]">
                                {orders.length > 0 ? (
                                    orders.map((order) => {
                                        return (
                                            <tr key={order._id} className="hover:bg-[var(--bg-hover)] transition-colors">
                                                <td className="p-4 whitespace-nowrap">
                                                    <span className="font-mono text-sm text-[var(--text-muted)]">
                                                        #{String(order._id || '').slice(-6)}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-[var(--text-main)]">
                                                            {order.user?.name || "Deleted User"}
                                                        </span>
                                                        <span className="text-xs text-[var(--text-muted)]">
                                                            {order.user?.email || "N/A"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${order.status === 'delivered' ? 'bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                        order.status === 'shipped' ? 'bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                                            'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                        }`}>
                                                        {(order.status || 'pending').charAt(0).toUpperCase() + (order.status || 'pending').slice(1)}
                                                    </span>
                                                </td>
                                                <td className="p-4 whitespace-nowrap text-sm font-medium text-[var(--text-main)]">
                                                    ${(order.totalPrice || 0).toFixed(2)}
                                                </td>
                                                <td className="p-4 whitespace-nowrap text-sm text-[var(--text-muted)]">
                                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-[var(--text-muted)]">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </QueryState>
        </div>
    )
}

export default OrderPage;