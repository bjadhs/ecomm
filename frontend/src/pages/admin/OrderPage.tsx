import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../../lib/adminApi";
import QueryState from "../../components/admin/QueryState";

const OrderPage = () => {
    const queryClient = useQueryClient();

    const { data: orders = [], isLoading, error } = useQuery({
        queryKey: ['orders'],
        queryFn: adminApi.getAllOrders,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => adminApi.updateOrderStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const handleStatusChange = (orderId: string, newStatus: string) => {
        updateStatusMutation.mutate({ id: orderId, status: newStatus });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-(--text-main)">Orders</h1>

            <QueryState
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading orders..."
            >
                <div className="bg-(--bg-card) rounded-lg shadow-sm border border-(--border-color) overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-(--bg-hover) border-b border-(--border-color)">
                                <tr>
                                    <th className="p-4 text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Order ID</th>
                                    <th className="p-4 text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Customer</th>
                                    <th className="p-4 text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Total</th>
                                    <th className="p-4 text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-(--border-color)">
                                {orders.length > 0 ? (
                                    orders.map((order) => {
                                        return (
                                            <tr key={order._id} className="hover:bg-(--bg-hover) transition-colors">
                                                <td className="p-4 whitespace-nowrap">
                                                    <span className="font-mono text-sm text-(--text-muted)">
                                                        #{String(order._id || '').slice(-6)}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-(--text-main)">
                                                            {order.user?.name || "Deleted User"}
                                                        </span>
                                                        <span className="text-xs text-(--text-muted)">
                                                            {order.user?.email || "N/A"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4 whitespace-nowrap">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                        disabled={updateStatusMutation.isPending}
                                                        className={`px-2 py-1 text-xs font-medium rounded-full border-none focus:ring-2 focus:ring-(--color-primary) cursor-pointer outline-none appearance-none ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                            }`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                    </select>
                                                </td>
                                                <td className="p-4 whitespace-nowrap text-sm font-medium text-(--text-main)">
                                                    ${(order.totalPrice || 0).toFixed(2)}
                                                </td>
                                                <td className="p-4 whitespace-nowrap text-sm text-(--text-muted)">
                                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-(--text-muted)">
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
    );
};

export default OrderPage;
