import { axiosInstance } from "./axios";

export const productApi = {
    getAllProducts: async () => {
        const { data } = await axiosInstance.get('/admin/products');
        return data;
    },
    createProduct: async (productData) => {
        const { data } = await axiosInstance.post('/admin/products', productData);
        return data;
    },
    updateProduct: async (id, productData) => {
        const { data } = await axiosInstance.put(`/admin/products/${id}`, productData);
        return data;
    },
    deleteProduct: async (id) => {
        const { data } = await axiosInstance.delete(`/admin/products/${id}`);
        return data;
    },
}

export const customerApi = {
    getAllCustomers: async () => {
        const { data } = await axiosInstance.get('/admin/customers');
        return data;
    }
}

export const orderApi = {
    getAllOrders: async () => {
        const { data } = await axiosInstance.get('/admin/orders');
        return data;
    }
}

