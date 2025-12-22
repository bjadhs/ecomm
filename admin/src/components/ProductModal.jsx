import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Loader2 } from 'lucide-react';

const ProductModal = ({ onClose, onSubmit, mutation, initialData }) => {
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
                price: initialData.price || '',
                category: initialData.category || '',
                stock: initialData.stock || '',
                images: Array.isArray(initialData.images) ? initialData.images.join(', ') : initialData.images || '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: Number(formData.stock),
            images: formData.images.split(',').map(img => img.trim()).filter(img => img !== ''),
        };
        onSubmit(productData);
    };

    const isPending = mutation?.isPending;
    const error = mutation?.error;

    return (
        <div className="modal-overlay fade-in">
            <div className="modal-content fade-in">
                <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-main)]">
                            {isEdit ? "Edit Product" : "Add New Product"}
                        </h2>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                            {isEdit ? "Update your product details" : "Fill in the details for your new listing"}
                        </p>
                    </div>
                    <button onClick={onClose} className="btn-icon">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-300 flex items-center gap-2 text-sm fade-in">
                            <AlertCircle size={16} />
                            <span>{error.response?.data?.message || error.message || "Something went wrong"}</span>
                        </div>
                    )}



                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[var(--text-main)]">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            disabled={isPending}
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="input-base"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-[var(--text-main)]">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                step="0.01"
                                required
                                disabled={isPending}
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="input-base"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-[var(--text-main)]">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                required
                                disabled={isPending}
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                className="input-base"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[var(--text-main)]">Category</label>
                        <input
                            type="text"
                            name="category"
                            required
                            disabled={isPending}
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g. Electronics, Fashion"
                            className="input-base"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[var(--text-main)]">Description</label>
                        <textarea
                            name="description"
                            required
                            disabled={isPending}
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Write a brief product description"
                            className="input-base resize-none"
                        ></textarea>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[var(--text-main)]">Images (Comma separated URLs)</label>
                        <input
                            type="text"
                            name="images"
                            disabled={isPending}
                            value={formData.images}
                            onChange={handleChange}
                            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            className="input-base"
                        />
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="btn-secondary flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="btn-primary flex-1"
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

