import { axiosInstance } from "./axios.ts";
import type { Product, Order } from "../types/index.ts";

export interface AdminOrder extends Omit<Order, 'items'> {
    user: {
        name: string;
        email: string;
    };
    items: Array<{
        product: Product;
        name: string;
        price: number;
        quantity: number;
        image: string;
    }>;
}

export interface Customer {
    _id: string;
    firstName: string;
    lastName: string;
    emailAddresses: Array<{ emailAddress: string }>;
    createdAt: string;
}

export const adminApi = {
    getAllProducts: async (): Promise<Product[]> => {
        const { data } = await axiosInstance.get<Product[]>('/admin/products');
        return data;
    },
    createProduct: async (productData: FormData): Promise<Product> => {
        const { data } = await axiosInstance.post<Product>('/admin/products', productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },
    updateProduct: async (id: string, productData: FormData): Promise<Product> => {
        const { data } = await axiosInstance.put<Product>(`/admin/products/${id}`, productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },
    deleteProduct: async (id: string): Promise<{ message: string }> => {
        const { data } = await axiosInstance.delete<{ message: string }>(`/admin/products/${id}`);
        return data;
    },
    getAllCustomers: async (): Promise<Customer[]> => {
        const { data } = await axiosInstance.get<Customer[]>('/admin/customers');
        return data;
    },
    getAllOrders: async (): Promise<AdminOrder[]> => {
        const { data } = await axiosInstance.get<AdminOrder[]>('/admin/orders');
        return data;
    },
    updateOrderStatus: async (id: string, status: string): Promise<AdminOrder> => {
        const { data } = await axiosInstance.patch<AdminOrder>(`/admin/order/${id}/status`, { status });
        return data;
    },
};
