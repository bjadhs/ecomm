import { axiosInstance } from "./axios.ts";
import type { Product, Cart, Order } from "../types/index.ts";



export const productApi = {
    getAllProducts: async (): Promise<Product[]> => {
        const { data } = await axiosInstance.get<Product[]>('/products');
        return data;
    },

}

export const cartApi = {
    getCart: async (): Promise<Cart> => {
        const { data } = await axiosInstance.get<Cart>('/users/cart');
        return data;
    },
    addToCart: async (productId: string, quantity: number): Promise<Cart> => {
        const { data } = await axiosInstance.post<Cart>('/users/cart', { productId, quantity });
        return data;
    },
    updateCartItem: async (productId: string, quantity: number): Promise<Cart> => {
        const { data } = await axiosInstance.put<Cart>(`/users/cart/${productId}`, { quantity });
        return data;
    },
    deleteCartItem: async (productId: string): Promise<Cart> => {
        const { data } = await axiosInstance.delete<Cart>(`/users/cart/${productId}`);
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

