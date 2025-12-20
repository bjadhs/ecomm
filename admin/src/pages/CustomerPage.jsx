import { useQuery } from "@tanstack/react-query";
import { customerApi } from "../lib/api";
import { Mail, User } from "lucide-react";

const CustomerPage = () => {
    const { data: customers = [], isLoading, error } = useQuery({
        queryKey: ['customers'],
        queryFn: customerApi.getAllCustomers,
    })

    if (isLoading) return (
        <div className="flex items-center justify-center p-10">
            <div className="text-xl font-medium text-gray-500">Loading customers...</div>
        </div>
    )

    if (error) return (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            Error loading customers: {error.message}
        </div>
    )

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Customers</h1>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Clerk ID</th>
                                <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {customers.length > 0 ? (
                                customers.map((customer) => (
                                    <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                    <User size={16} />
                                                </div>
                                                <span className="font-medium text-gray-900">{customer.name || "N/A"}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail size={14} />
                                                <span>{customer.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 whitespace-nowrap">
                                            <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                {customer.clerkId}
                                            </span>
                                        </td>
                                        <td className="p-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(customer.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">
                                        No customers found.
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

export default CustomerPage