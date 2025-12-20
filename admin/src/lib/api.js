import { axiosInstance } from "./axios";

export const productApi = {
    getAllProducts: async () => {
        const { data } = await axiosInstance.get('/products');
        return data;
    },
    createProduct: async (productData) => {
        const { data } = await axiosInstance.post('/products', productData);
        return data;
    },
    updateProduct: async (id, productData) => {
        const { data } = await axiosInstance.put(`/products/${id}`, productData);
        return data;
    },
    deleteProduct: async (id) => {
        const { data } = await axiosInstance.delete(`/products/${id}`);
        return data;
    },
}

