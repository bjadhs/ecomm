import { useAuth } from '@clerk/clerk-react';
import { Navigate, Routes, Route } from 'react-router';
import { LoginPage, DashboardPage, CustomerPage, OrderPage, ProductPage } from './pages';
import PageLoader from './components/PageLoader';
import DashboardLayout from './layout';

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();


  if (!isLoaded) {
    return <PageLoader />;
  }
  return (
    <Routes>
      <Route path="/admin/login" element={isSignedIn ? <Navigate to="/admin/dashboard" /> : <LoginPage />} />

      <Route path="/admin" element={isSignedIn ? <DashboardLayout /> : <Navigate to="/admin/login" />} >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="customer" element={<CustomerPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="product" element={<ProductPage />} />
      </Route>

    </Routes>
  )
}

export default App