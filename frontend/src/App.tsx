import { useAuth } from '@clerk/clerk-react';
import { Navigate, Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

import DashboardLayout from './layout';

const App = () => {
  const { isSignedIn } = useAuth();

  return (
    <Routes>
      <Route
        path='/login'
        element={isSignedIn ? <Navigate to='/home' /> : <LoginPage />}
      />

      <Route
        path='/'
        element={isSignedIn ? <DashboardLayout /> : <Navigate to='/login' />}
      >
        <Route index element={<Navigate to='/home' replace />} />
        <Route path='home' element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
