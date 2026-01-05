import { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Loader2 } from 'lucide-react';
import type { Product } from '../../types';

interface ProductModalProps {
    onClose: () => void;
    onSubmit: (data: any) => void;
    mutation: any;
    initialData?: Product | null;
}

const ProductModal = ({ onClose, onSubmit, mutation, initialData }: ProductModalProps) => {
    const isEdit = !!initialData;
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        images: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: String(initialData.price) || '',
                category: initialData.category || '',
                stock: String(initialData.stock) || '',
                images: Array.isArray(initialData.images) ? initialData.images.join(', ') : initialData.images || '',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const price = parseFloat(formData.price);
        const stock = Number(formData.stock);
        if (isNaN(price) || isNaN(stock)) {
            return;
        }

        const productData = {
            ...formData,
            price,
            stock,
            images: formData.images.split(',').map(img => img.trim()).filter(img => img !== ''),
        };
        onSubmit(productData);
    };

    const isPending = mutation?.isPending;
    const error = mutation?.error;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all animate-in fade-in duration-200">
            <div className="bg-(--bg-main) w-full max-w-lg rounded-3xl shadow-2xl border border-(--border-color) overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-(--border-color)">
                    <div>
                        <h2 className="text-xl font-bold text-(--text-main)">
                            {isEdit ? "Edit Product" : "Add New Product"}
                        </h2>
                        <p className="text-xs text-(--text-muted) mt-0.5">
                            {isEdit ? "Update your product details" : "Fill in the details for your new listing"}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 text-(--text-muted) hover:bg-(--bg-hover) hover:text-(--text-main) rounded-full transition-colors" aria-label="Close modal">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-300 flex items-center gap-2 text-sm">
                            <AlertCircle size={16} />
                            <span>{error.response?.data?.message || error.message || "Something went wrong"}</span>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-(--text-main)">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            disabled={isPending}
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full px-4 py-2.5 bg-(--bg-hover) border border-(--border-color) rounded-xl text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-(--text-main)">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                step="1"
                                min="0"
                                required
                                disabled={isPending}
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full px-4 py-2.5 bg-(--bg-hover) border border-(--border-color) rounded-xl text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-(--text-main)">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                required
                                disabled={isPending}
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full px-4 py-2.5 bg-(--bg-hover) border border-(--border-color) rounded-xl text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-(--text-main)">Category</label>
                        <input
                            type="text"
                            name="category"
                            required
                            disabled={isPending}
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g. Electronics, Fashion"
                            className="w-full px-4 py-2.5 bg-(--bg-hover) border border-(--border-color) rounded-xl text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-(--text-main)">Description</label>
                        <textarea
                            name="description"
                            required
                            disabled={isPending}
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Write a brief product description"
                            className="w-full px-4 py-2.5 bg-(--bg-hover) border border-(--border-color) rounded-xl text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                        ></textarea>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-(--text-main)">Images (Comma separated URLs)</label>
                        <input
                            type="text"
                            name="images"
                            disabled={isPending}
                            value={formData.images}
                            onChange={handleChange}
                            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            className="w-full px-4 py-2.5 bg-(--bg-hover) border border-(--border-color) rounded-xl text-(--text-main) placeholder:text-(--text-muted) focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 border border-(--border-color) text-(--text-main) rounded-xl font-semibold hover:bg-(--bg-hover) transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <Save size={18} />
                            )}
                            {isPending ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Product" : "Create Product")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
