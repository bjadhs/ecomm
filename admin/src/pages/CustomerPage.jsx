import { useQuery } from "@tanstack/react-query";
import { customerApi } from "../lib/api";
import { Mail, User } from "lucide-react";
import QueryState from "../components/QueryState";

const CustomerPage = () => {
    const { data: customers = [], isLoading, error } = useQuery({
        queryKey: ['customers'],
        queryFn: customerApi.getAllCustomers,
    })

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-[var(--text-main)]">Customers</h1>

            <QueryState
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading customers..."
            >
                <div className="bg-[var(--bg-card)] rounded-lg shadow-sm border border-[var(--border-color)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[var(--bg-hover)] border-b border-[var(--border-color)]">
                                <tr>
                                    <th className="table-head">Name</th>
                                    <th className="table-head">Email</th>
                                    <th className="table-head">Joined Date</th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)]">
                                {customers.length > 0 ? (
                                    customers.map((customer) => (
                                        <tr key={customer._id} className="hover:bg-[var(--bg-hover)] transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                        <User size={16} />
                                                    </div>
                                                    <span className="font-medium text-[var(--text-main)]">{customer.name || "N/A"}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-[var(--text-muted)]">
                                                    <Mail size={14} />
                                                    <span>{customer.email || "N/A"}</span>
                                                </div>
                                            </td>

                                            <td className="p-4 whitespace-nowrap text-sm text-[var(--text-muted)]">
                                                {new Date(customer.createdAt).toLocaleDateString()}
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-[var(--text-muted)]">
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
    )
}

export default CustomerPage;