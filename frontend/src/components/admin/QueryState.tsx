import { AlertCircle } from 'lucide-react';
import type { ReactNode } from 'react';

interface QueryStateProps {
    isLoading: boolean;
    error: any;
    loadingMessage?: string;
    children: ReactNode;
    isEmpty?: boolean;
    emptyComponent?: ReactNode;
}

const QueryState = ({
    isLoading,
    error,
    loadingMessage = "Loading...",
    children,
    isEmpty = false,
    emptyComponent
}: QueryStateProps) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-4">
                <div className="w-10 h-10 border-4 border-(--color-primary) border-t-transparent rounded-full animate-spin" />
                <p className="font-medium animate-pulse text-(--text-muted)">{loadingMessage}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-100 dark:bg-red-900/40 rounded-xl flex items-start gap-4 fade-in">
                <div className="p-3 bg-red-200 dark:bg-red-800 rounded-xl">
                    <AlertCircle size={24} className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                    <h3 className="font-bold text-red-800 dark:text-red-200">Something went wrong</h3>
                    <p className="text-sm opacity-90 text-red-700 dark:text-red-300">{error.response?.data?.message || error.message || "An unexpected error occurred. Please try again later."}</p>
                </div>
            </div>
        );
    }


    if (isEmpty && emptyComponent) {
        return <>{emptyComponent}</>;
    }

    return <div className="fade-in">{children}</div>;
};

export default QueryState;
