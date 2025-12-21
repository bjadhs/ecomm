import { useQuery } from '@tanstack/react-query';
import { productApi } from '../lib/api';
import ProductCard from '../components/ProductCard';
import { Plus } from 'lucide-react';

const ProductPage = () => {
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: productApi.getAllProducts,
    })

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-[var(--text-muted)] gap-3">
            <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
            <p className="font-medium animate-pulse">Loading amazing products...</p>
        </div>
    );

    if (error) return (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-300 flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">⚠️</div>
            <div>
                <p className="font-bold text-red-800 dark:text-red-200">Something went wrong</p>
                <p className="text-sm">{error.message}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">

                <h1 className="text-2xl font-bold text-[var(--text-main)]">Products</h1>

                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-400 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all shadow-sm hover:shadow-blue-200 active:scale-95">
                    <Plus size={18} />
                    Add New Product
                </button>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onEdit={() => console.log('Edit', product._id)}
                            onDelete={() => console.log('Delete', product._id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-4 bg-[var(--bg-card)] rounded-2xl border-2 border-dashed border-[var(--border-color)]">
                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">No products found</h3>
                    <p className="text-[var(--text-muted)] text-center max-w-sm mb-6">
                        Start building your store by adding your first product to the catalog.
                    </p>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[var(--text-main)] hover:bg-[var(--text-muted)] text-white dark:text-[var(--bg-main)] rounded-lg font-medium transition-colors">
                        <Plus size={16} />
                        Add First Product
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProductPage