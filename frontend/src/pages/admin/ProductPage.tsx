import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../lib/adminApi';
import ProductCard from '../../components/admin/ProductCard';
import ProductModal from '../../components/admin/ProductModal';
import QueryState from '../../components/admin/QueryState';
import { Plus } from 'lucide-react';
import type { Product } from '../../types';

const ProductPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const queryClient = useQueryClient();

    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: adminApi.getAllProducts,
    });

    const createProductMutation = useMutation({
        mutationFn: adminApi.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            handleCloseModal();
        }
    });

    const updateProductMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => adminApi.updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            handleCloseModal();
        }
    });

    const deleteProductMutation = useMutation({
        mutationFn: adminApi.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error: any) => {
            alert(error?.response?.data?.message || error.message || "Failed to delete product");
        }
    });

    const handleOpenCreateModal = () => {
        setEditingProduct(null);
        setShowModal(true);
    };

    const handleOpenEditModal = (product: Product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        createProductMutation.reset();
        updateProductMutation.reset();
    };

    const handleSubmitProduct = (productData: any) => {
        if (editingProduct) {
            updateProductMutation.mutate({ id: editingProduct._id, data: productData });
        } else {
            createProductMutation.mutate(productData);
        }
    };

    const handleDeleteProduct = (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProductMutation.mutate(id);
        }
    };

    const emptyState = (
        <div className="flex flex-col items-center justify-center py-24 px-6 bg-(--bg-card) rounded-3xl border-2 border-dashed border-(--border-color) text-center animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-(--text-main) mb-1">No products found</h3>
            <p className="text-(--text-muted) text-center max-w-sm mb-6">
                Start building your store by adding your first product to the catalog.
            </p>
            <button
                onClick={handleOpenCreateModal}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
                <Plus size={16} />
                Add First Product
            </button>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-300">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-(--text-main) tracking-tight">Products</h1>
                    <p className="text-sm text-(--text-muted) mt-1">Manage your storefront inventory and listings</p>
                </div>
                <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 self-start sm:self-auto"
                >
                    <Plus size={20} strokeWidth={2.5} />
                    <span>Add New Product</span>
                </button>
            </header>


            <QueryState
                isLoading={isLoading}
                error={error}
                loadingMessage="Loading amazing products..."
                isEmpty={products.length === 0}
                emptyComponent={emptyState}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onEdit={handleOpenEditModal}
                            onDelete={handleDeleteProduct}
                        />
                    ))}
                </div>
            </QueryState>

            {showModal && (
                <ProductModal
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitProduct}
                    mutation={editingProduct ? updateProductMutation : createProductMutation}
                    initialData={editingProduct}
                />
            )}
        </div>
    );
};

export default ProductPage;
