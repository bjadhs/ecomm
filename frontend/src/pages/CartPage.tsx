import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cartApi } from '../lib/api';

const CartPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: cart, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.getCart,
  });

  const updateMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.updateCartItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => cartApi.deleteCartItem(productId),
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
          <p className='text-xl text-red-500 mb-2'>Failed to load cart</p>
          <p className='text-(--text-muted)'>
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
      </div>
    );
  }

  const cartItems = cart?.items || [];
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 0 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-(--text-main) mb-2'>
            Shopping Cart
          </h1>
          <p className='text-lg text-(--text-muted)'>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart
          </p>
        </div>

        {/* Cart Layout */}
        {cartItems.length > 0 ? (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart Items */}
            <div className='lg:col-span-2 space-y-4'>
              {cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className='bg-(--bg-card) border border-(--border-color) rounded-lg p-6 flex items-start gap-6'
                >
                  {/* Product Image */}
                  <div className='w-24 h-24 bg-(--bg-hover) rounded-lg overflow-hidden shrink-0'>
                    {item.product.images && item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <ShoppingCart className='w-8 h-8 text-(--text-muted)' />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className='flex-1 min-w-0'>
                    <h3 className='text-lg font-semibold text-(--text-main) mb-2 line-clamp-2'>
                      {item.product.name}
                    </h3>
                    <p className='text-2xl font-bold text-(--color-primary) mb-4'>
                      ${item.product.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateMutation.mutate({
                              productId: item.product._id,
                              quantity: item.quantity - 1,
                            });
                          }
                        }}
                        disabled={item.quantity <= 1 || updateMutation.isPending}
                        className='p-2 text-(--text-muted) hover:text-(--text-main) rounded-full hover:bg-(--bg-hover) transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <Minus className='w-4 h-4' />
                      </button>
                      <span className='w-12 text-center font-semibold text-(--text-main)'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          if (item.quantity < item.product.stock) {
                            updateMutation.mutate({
                              productId: item.product._id,
                              quantity: item.quantity + 1,
                            });
                          }
                        }}
                        disabled={
                          item.quantity >= item.product.stock ||
                          updateMutation.isPending
                        }
                        className='p-2 text-(--text-muted) hover:text-(--text-main) rounded-full hover:bg-(--bg-hover) transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                      <span className='text-xs text-(--text-muted) ml-4'>
                        {item.product.stock > 0
                          ? `${item.product.stock} in stock`
                          : 'Out of stock'}
                      </span>
                    </div>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className='flex flex-col items-end gap-4'>
                    <div className='text-right'>
                      <p className='text-sm text-(--text-muted) mb-1'>Subtotal</p>
                      <p className='text-2xl font-bold text-(--color-primary)'>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeMutation.mutate(item.product._id)}
                      disabled={removeMutation.isPending}
                      className='p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      <Trash2 className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className='lg:sticky lg:top-6 h-fit'>
              <div className='bg-(--bg-card) border border-(--border-color) rounded-lg p-6'>
                <h2 className='text-2xl font-bold text-(--text-main) mb-6'>
                  Order Summary
                </h2>

                <div className='space-y-3 mb-6 pb-6 border-b border-(--border-color)'>
                  <div className='flex items-center justify-between'>
                    <span className='text-(--text-muted)'>Subtotal</span>
                    <span className='text-(--text-main) font-semibold'>
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-(--text-muted)'>Shipping</span>
                    <span className='text-green-600 font-semibold'>Free</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-(--text-muted)'>Tax (10%)</span>
                    <span className='text-(--text-main) font-semibold'>
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className='mb-6'>
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-bold text-(--text-main)'>
                      Total
                    </span>
                    <span className='text-3xl font-bold text-(--color-primary)'>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/address')}
                  disabled={cartItems.length === 0}
                  className='w-full bg-(--color-primary) text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity mb-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  Proceed to Checkout
                </button>
                <a
                  href='/home'
                  className='block text-center py-2 px-4 text-(--color-primary) border border-(--color-primary) rounded-lg font-semibold hover:bg-(--color-primary) hover:text-white transition-all'
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-center py-16'>
            <ShoppingCart className='w-16 h-16 text-(--text-muted) mx-auto mb-4' />
            <h3 className='text-2xl font-semibold text-(--text-main) mb-2'>
              Your cart is empty
            </h3>
            <p className='text-(--text-muted) mb-6'>
              Add some items to get started
            </p>
            <a
              href='/home'
              className='inline-block bg-(--color-primary) text-white py-2 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity'
            >
              Continue Shopping
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;