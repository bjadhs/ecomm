import { useAuth } from '@clerk/clerk-react';
import { Navigate, Routes, Route } from 'react-router';
import { LoginPage, DashboardPage, CustomerPage, OrderPage, ProductPage } from './pages';
import PageLoader from './components/PageLoader';

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <PageLoader />;
  }
  return (
    <Routes>
      <Route path="/login" element={isSignedIn ? <Navigate to="/dashboard" /> : <LoginPage />} />

      <Route path="/" element={isSignedIn ? <DashboardPage /> : <Navigate to="/login" />} >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="customer" element={<CustomerPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="product" element={<ProductPage />} />

      </Route>

    </Routes>
  )
}



export default App