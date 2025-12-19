import { LoaderIcon } from 'lucide-react';

function PageLoader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <LoaderIcon className="animate-spin" size={24} />
        </div>
    )
}

export default PageLoader