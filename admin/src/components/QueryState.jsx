import { AlertCircle } from 'lucide-react';

const QueryState = ({
    isLoading,
    error,
    loadingMessage = "Loading...",
    children,
    isEmpty = false,
    emptyComponent
}) => {
    if (isLoading) {
        return (
            <div className="spinner-container">
                <div className="spinner" />
                <p className="font-medium animate-pulse">{loadingMessage}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-card fade-in">
                <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-xl">
                    <AlertCircle size={24} className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                    <h3 className="font-bold text-red-800 dark:text-red-200">Something went wrong</h3>
                    <p className="text-sm opacity-90">{error.response?.data?.message || error.message || "An unexpected error occurred. Please try again later."}</p>
                </div>
            </div>
        );
    }


    if (isEmpty && emptyComponent) {
        return emptyComponent;
    }

    return <div className="fade-in">{children}</div>;
};

export default QueryState;
