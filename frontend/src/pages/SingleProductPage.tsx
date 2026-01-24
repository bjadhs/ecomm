import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import { ShoppingCart, Star, Loader2, ArrowLeft } from 'lucide-react';
import { productApi, cartApi } from '../lib/api';
import { toast } from 'react-toastify';

const SingleProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => productApi.getProductById(id!),
        enabled: !!id,
    });

    const addToCartMutation = useMutation({
        mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
            cartApi.addToCart(productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success('Added to cart');
        },
        onError: () => {
            toast.error('Failed to add to cart');
        }
    });

    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin text-(--color-primary)' />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center p-6'>
                <p className='text-xl text-red-500 mb-4'>
                    {error ? 'Failed to load product' : 'Product not found'}
                </p>
                <button
                    onClick={() => navigate('/home')}
                    className='flex items-center gap-2 text-(--text-muted) hover:text-(--text-main) transition-colors'
                >
                    <ArrowLeft className='w-4 h-4' />
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className='min-h-screen p-6'>
            <div className='max-w-7xl mx-auto'>
                <button
                    onClick={() => navigate('/home')}
                    className='flex items-center gap-2 text-(--text-muted) hover:text-(--text-main) mb-8 transition-colors'
                >
                    <ArrowLeft className='w-5 h-5' />
                    Back to Home
                </button>

                <div className='bg-(--bg-card) border border-(--border-color) rounded-2xl overflow-hidden shadow-sm'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-8'>
                        {/* Product Image */}
                        <div className='aspect-square rounded-xl overflow-hidden bg-(--bg-hover) flex items-center justify-center'>
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className='w-full h-full object-cover'
                                />
                            ) : (
                                <ShoppingCart className='w-24 h-24 text-(--text-muted)' />
                            )}
                        </div>

                        {/* Product Details */}
                        <div className='flex flex-col'>
                            <div className='mb-4'>
                                <span className='inline-block px-3 py-1 rounded-full text-xs font-semibold bg-(--bg-hover) text-(--text-muted) uppercase tracking-wide'>
                                    {product.category}
                                </span>
                            </div>

                            <h1 className='text-4xl font-bold text-(--text-main) mb-4'>
                                {product.name}
                            </h1>

                            <div className='flex items-center gap-4 mb-6'>
                                {product.averageRating > 0 && (
                                    <div className='flex items-center gap-1 bg-yellow-400/10 px-2 py-1 rounded-lg'>
                                        <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                                        <span className='font-bold text-yellow-600'>
                                            {product.averageRating.toFixed(1)}
                                        </span>
                                        <span className='text-xs text-yellow-600/80 ml-1'>
                                            ({product.totalReviews} reviews)
                                        </span>
                                    </div>
                                )}
                                <div className={`px-3 py-1 rounded-md text-sm font-medium ${product.stock > 0 ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </div>
                            </div>

                            <p className='text-lg text-(--text-muted) mb-8 leading-relaxed'>
                                {product.description}
                            </p>

                            <div className='mt-auto border-t border-(--border-color) pt-8'>
                                <div className='flex items-center justify-between mb-6'>
                                    <div>
                                        <p className='text-sm text-(--text-muted) mb-1'>Price</p>
                                        <div className='text-4xl font-bold text-(--color-primary)'>
                                            ${product.price.toFixed(2)}
                                        </div>
                                    </div>
                                    {product.stock > 0 && (
                                        <div className='text-right'>
                                            <p className='text-sm text-(--text-muted) mb-1'>Availability</p>
                                            <p className='font-medium text-(--text-main)'>{product.stock} units</p>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => addToCartMutation.mutate({ productId: product._id, quantity: 1 })}
                                    disabled={product.stock === 0 || addToCartMutation.isPending}
                                    className='w-full bg-(--color-primary) text-white py-4 px-6 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform active:scale-[0.99]'
                                >
                                    <ShoppingCart className='w-6 h-6' />
                                    {addToCartMutation.isPending ? 'Adding to Cart...' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;
