import { useAuth } from '@clerk/clerk-react';
import { Navigate, Routes, Route } from 'react-router';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import SingleProductPage from './pages/SingleProductPage';

import DashboardLayout from './layout';
import AddressPage from './pages/AddressPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import CustomerPage from './pages/admin/CustomerPage';
import AdminOrderPage from './pages/admin/OrderPage';
import ProductPage from './pages/admin/ProductPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { isSignedIn } = useAuth();

  return (
    <Routes>
      <Route
        path='/login'
        element={isSignedIn ? <Navigate to='/home' /> : <AuthPage />}
      />

      <Route
        path='/'
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to='/home' replace />} />
        <Route path='home' element={<HomePage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='orders' element={<OrderPage />} />
        <Route path='address' element={<AddressPage />} />
        <Route path='product/:id' element={<SingleProductPage />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path='/admin'
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to='/admin/dashboard' replace />} />
        <Route path='dashboard' element={<DashboardPage />} />
        <Route path='customer' element={<CustomerPage />} />
        <Route path='order' element={<AdminOrderPage />} />
        <Route path='product' element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default App;
