import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../../lib/adminApi";
import { Mail, User } from "lucide-react";
import QueryState from "../../components/admin/QueryState";

const CustomerPage = () => {
    const { data: customers = [], isLoading, error } = useQuery({
        queryKey: ['customers'],
        queryFn: adminApi.getAllCustomers,
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-(--text-main)">Customers</h1>

            <QueryState
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading customers..."
            >
                <div className="bg-(--bg-card) rounded-lg shadow-sm border border-(--border-color) overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-(--bg-hover) border-b border-(--border-color)">
                                <tr>
                                    <th className="p-4 text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Name</th>
                                    <th className="p-4 text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Email</th>
                                    <th className="p-4 text-xs font-semibold text-(--text-muted) uppercase tracking-wider">Joined Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-(--border-color)">
                                {customers.length > 0 ? (
                                    customers.map((customer) => (
                                        <tr key={customer._id} className="hover:bg-(--bg-hover) transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                        <User size={16} />
                                                    </div>
                                                    <span className="font-medium text-(--text-main)">
                                                        {customer.firstName && customer.lastName
                                                            ? `${customer.firstName} ${customer.lastName}`
                                                            : customer.firstName || "N/A"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-(--text-muted)">
                                                    <Mail size={14} />
                                                    <span>{customer.emailAddresses?.[0]?.emailAddress || "N/A"}</span>
                                                </div>
                                            </td>

                                            <td className="p-4 whitespace-nowrap text-sm text-(--text-muted)">
                                                {new Date(customer.createdAt).toLocaleDateString()}
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center text-(--text-muted)">
                                            No customers found.
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

export default CustomerPage;
