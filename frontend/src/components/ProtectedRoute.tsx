import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router';
import { isAdmin } from '../lib/auth';
import PageLoader from './admin/PageLoader';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
    const { isLoaded, isSignedIn, user } = useUser();
    const location = useLocation();

    if (!isLoaded) {
        return <PageLoader />;
    }

    if (!isSignedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin) {
        const userEmail = user?.emailAddresses[0]?.emailAddress;
        if (!isAdmin(userEmail)) {
            return <Navigate to="/home" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
