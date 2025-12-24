import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../lib/api';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import QueryState from '../components/QueryState';
import { Plus } from 'lucide-react';

const ProductPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const queryClient = useQueryClient();

    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: productApi.getAllProducts,
    })

    const createProductMutation = useMutation({
        mutationFn: productApi.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            handleCloseModal();
        }
    })

    const updateProductMutation = useMutation({
        mutationFn: ({ id, ...data }) => productApi.updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            handleCloseModal();
        }
    })

    const deleteProductMutation = useMutation({
        mutationFn: productApi.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            alert(error?.response?.data?.message || error.message || "Failed to delete product");
        }
    })

    const handleOpenCreateModal = () => {
        setEditingProduct(null);
        setShowModal(true);
    };

    const handleOpenEditModal = (product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        createProductMutation.reset();
        updateProductMutation.reset();
    };

    const handleSubmitProduct = (productData) => {
        if (editingProduct) {
            updateProductMutation.mutate({ id: editingProduct._id, ...productData });
        } else {
            createProductMutation.mutate(productData);
        }
    }

    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProductMutation.mutate(id);
        }
    }

    const emptyState = (
        <div className="empty-state-container fade-in">
            <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">No products found</h3>
            <p className="text-[var(--text-muted)] text-center max-w-sm mb-6">
                Start building your store by adding your first product to the catalog.
            </p>
            <button
                onClick={handleOpenCreateModal}
                className="btn-primary"
            >
                <Plus size={16} />
                Add First Product
            </button>
        </div>
    );

    return (
        <div className="space-y-10 fade-in">
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">Products</h1>
                    <p className="text-sm text-[var(--text-muted)] mt-1">Manage your storefront inventory and listings</p>
                </div>
                <button
                    onClick={handleOpenCreateModal}
                    className="btn-primary self-start sm:self-auto"
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
                <div className="grid-products">
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
    )
}


export default ProductPage;