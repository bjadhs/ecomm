import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ShoppingCart, Star, Loader2 } from 'lucide-react';
import { productApi, cartApi } from '../lib/api';
import type { Product } from '../types/index';

const HomePage = () => {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: productApi.getAllProducts,
  });

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.addToCart(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Loader2 className='w-12 h-12 animate-spin text-(--color-primary)' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-xl text-red-500 mb-2'>Failed to load products</p>
          <p className='text-(--text-muted)'>
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Hero Section */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-(--text-main) mb-2'>
            Welcome to Our Store
          </h1>
          <p className='text-lg text-(--text-muted)'>
            Discover amazing products at great prices
          </p>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {products.map((product: Product) => (
              <div
                key={product._id}
                className='bg-(--bg-card) border border-(--border-color) rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105'
              >
                {/* Product Image */}
                <div className='relative w-full h-48 bg-(--bg-hover)'>
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                      <ShoppingCart className='w-16 h-16 text-(--text-muted)' />
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold'>
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className='p-4'>
                  <div className='mb-2'>
                    <span className='text-xs text-(--text-muted) uppercase'>
                      {product.category}
                    </span>
                  </div>
                  <h3 className='text-lg font-semibold text-(--text-main) mb-2 line-clamp-2'>
                    {product.name}
                  </h3>
                  <p className='text-sm text-(--text-muted) mb-3 line-clamp-2'>
                    {product.description}
                  </p>

                  {/* Rating */}
                  {product.averageRating > 0 && (
                    <div className='flex items-center gap-1 mb-3'>
                      <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                      <span className='text-sm font-medium text-(--text-main)'>
                        {product.averageRating.toFixed(1)}
                      </span>
                      <span className='text-xs text-(--text-muted)'>
                        ({product.totalReviews} reviews)
                      </span>
                    </div>
                  )}

                  {/* Price and Stock */}
                  <div className='flex items-center justify-between mb-3'>
                    <div>
                      <span className='text-2xl font-bold text-(--color-primary)'>
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className='text-xs text-(--text-muted)'>
                      {product.stock > 0 ? (
                        <span>{product.stock} in stock</span>
                      ) : (
                        <span className='text-red-500'>Out of stock</span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() =>
                      addToCartMutation.mutate({
                        productId: product._id,
                        quantity: 1,
                      })
                    }
                    disabled={product.stock === 0 || addToCartMutation.isPending}
                    className='w-full bg-(--color-primary) text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                  >
                    <ShoppingCart className='w-4 h-4' />
                    {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <ShoppingCart className='w-16 h-16 text-(--text-muted) mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-(--text-main) mb-2'>
              No products available
            </h3>
            <p className='text-(--text-muted)'>
              Check back later for new products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
