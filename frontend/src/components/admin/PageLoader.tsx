import { LoaderIcon } from 'lucide-react';

const PageLoader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <LoaderIcon className="animate-spin text-(--color-primary)" size={32} />
        </div>
    );
};

export default PageLoader;
