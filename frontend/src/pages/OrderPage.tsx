import { useQuery } from '@tanstack/react-query';
import { Loader2, Package, Truck, CheckCircle, Clock, ShoppingBag } from 'lucide-react';
import { orderApi } from '../lib/api';
import type { Order } from '../types/index';

const OrderPage = () => {
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['user-orders'],
    queryFn: orderApi.getUserOrders,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className='w-5 h-5' />;
      case 'shipped':
        return <Truck className='w-5 h-5' />;
      case 'delivered':
        return <CheckCircle className='w-5 h-5' />;
      default:
        return <Package className='w-5 h-5' />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

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
          <p className='text-xl text-red-500 mb-2'>Failed to load orders</p>
          <p className='text-(--text-muted)'>
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-(--text-main) mb-2'>
            Your Orders
          </h1>
          <p className='text-lg text-(--text-muted)'>
            Track and manage your orders
          </p>
        </div>

        {/* Orders List */}
        {orders && orders.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {orders.map((order: Order) => (
              <div
                key={order._id}
                className='bg-(--bg-card) border border-(--border-color) rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200'
              >
                {/* Order Header */}
                <div className='p-6 border-b border-(--border-color)'>
                  <div className='flex items-start justify-between mb-4'>
                    <div>
                      <p className='text-sm text-(--text-muted) uppercase mb-1'>
                        Order ID
                      </p>
                      <p className='text-lg font-semibold text-(--text-main)'>
                        {order._id.slice(0, 12)}...
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className='capitalize'>{order.status}</span>
                    </div>
                  </div>

                  <div className='text-sm text-(--text-muted)'>
                    <p>
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className='p-6 border-b border-(--border-color)'>
                  <p className='text-sm font-semibold text-(--text-main) mb-3'>
                    Items ({order.items.length})
                  </p>
                  <div className='space-y-2'>
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className='flex items-center justify-between text-sm'>
                        <div>
                          <p className='text-(--text-main) font-medium line-clamp-1'>
                            {item.name}
                          </p>
                          <p className='text-(--text-muted) text-xs'>
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className='text-(--text-main) font-semibold'>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className='text-xs text-(--text-muted) italic'>
                        +{order.items.length - 3} more item{order.items.length - 3 > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>

                {/* Order Footer */}
                <div className='p-6 bg-(--bg-hover)'>
                  <div className='flex items-center justify-between mb-4'>
                    <span className='text-(--text-muted) font-medium'>Total:</span>
                    <span className='text-2xl font-bold text-(--color-primary)'>
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button className='w-full bg-(--color-primary) text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity'>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <ShoppingBag className='w-16 h-16 text-(--text-muted) mx-auto mb-4' />
            <h3 className='text-2xl font-semibold text-(--text-main) mb-2'>
              You haven't placed any orders yet
            </h3>
            <p className='text-(--text-muted) mb-6'>
              Start shopping to see your orders here
            </p>
            <a
              href='/home'
              className='inline-block bg-(--color-primary) text-white py-2 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity'
            >
              Start Shopping
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
