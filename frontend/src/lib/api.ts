import { axiosInstance } from "./axios.ts";
import type { Product, Cart, Order, Address } from "../types/index.ts";
import type { AppRole } from "./auth.ts";

export interface MeResponse {
    id: string;
    email: string | null;
    role: AppRole;
    /** permanent admin via the env allowlist */
    locked: boolean;
}

export const userApi = {
    getMe: async (): Promise<MeResponse> => {
        const { data } = await axiosInstance.get<MeResponse>('/user/me');
        return data;
    },
    setRole: async (role: AppRole): Promise<MeResponse> => {
        const { data } = await axiosInstance.patch<MeResponse>('/user/role', { role });
        return data;
    },
};



export const productApi = {
    getAllProducts: async (): Promise<Product[]> => {
        const { data } = await axiosInstance.get<Product[]>('/products');
        return data;
    },
    getProductById: async (id: string): Promise<Product> => {
        const { data } = await axiosInstance.get<Product>(`/products/${id}`);
        return data;
    },

}

export const cartApi = {
    getCart: async (): Promise<Cart> => {
        const { data } = await axiosInstance.get<Cart>('/cart');
        return data;
    },
    addToCart: async (productId: string, quantity: number): Promise<Cart> => {
        const { data } = await axiosInstance.post<Cart>('/cart', { productId, quantity });
        return data;
    },
    updateCartItem: async (productId: string, quantity: number): Promise<Cart> => {
        const { data } = await axiosInstance.put<Cart>(`/cart/${productId}`, { quantity });
        return data;
    },
    deleteCartItem: async (productId: string): Promise<Cart> => {
        const { data } = await axiosInstance.delete<Cart>(`/cart/${productId}`);
        return data;
    }
}

export const orderApi = {
    getUserOrders: async (): Promise<Order[]> => {
        const { data } = await axiosInstance.get('/orders');
        return data;
    },
    createOrder: async (orderData: any): Promise<Order> => {
        const { data } = await axiosInstance.post('/orders', orderData);
        return data;
    }
};

export const addressApi = {
    getAddresses: async (): Promise<Address[]> => {
        const { data } = await axiosInstance.get<Address[]>('/address');
        return data;
    },
    addAddress: async (address: Omit<Address, '_id'>): Promise<Address> => {
        const { data } = await axiosInstance.post<Address>('/address', address);
        return data;
    },
    updateAddress: async (id: string, address: Partial<Address>): Promise<Address> => {
        const { data } = await axiosInstance.put<Address>(`/address/${id}`, address);
        return data;
    },
    deleteAddress: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/address/${id}`);
    }
};

