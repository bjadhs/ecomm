import { useQuery } from "@tanstack/react-query"
import { orderApi } from "../lib/api"

const OrderPage = () => {
    const { data: orders = [], isLoading, error } = useQuery({
        queryKey: ['orders'],
        queryFn: orderApi.getAllOrders,
    })

    if (isLoading) return (
        <div className="flex items-center justify-center p-10">
            <div className="text-xl font-medium text-gray-500">Loading orders...</div>
        </div>
    )

    if (error) return (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            Error loading orders: {error.message}
        </div>
    )

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Orders</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 whitespace-nowrap">
                                            <span className="font-mono text-sm text-gray-600">
                                                #{order._id.slice(-6)}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900">{order.user?.name || "Unknown User"}</span>
                                                <span className="text-xs text-gray-500">{order.user?.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ${order.totalPrice.toFixed(2)}
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrderPage