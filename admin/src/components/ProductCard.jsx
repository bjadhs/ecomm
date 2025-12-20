import React from 'react';
import { Package, Edit2, Trash2, MoreVertical, Star, Inbox } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete }) => {
    const { name, description, price, stock, category, images } = product;

    return (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col">
            <div className="aspect-square bg-slate-50 flex items-center justify-center">
                {images?.[0] ? (
                    <img src={images[0]} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <Package size={32} className="text-slate-300" />
                )}
            </div>

            <div className="p-4 flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-slate-900 truncate flex-1">{name}</h3>
                    <p className="font-bold text-slate-900">${price}</p>
                </div>

                <p className="text-xs text-slate-500 uppercase tracking-wider">{category}</p>
                <p className="text-sm text-slate-600 line-clamp-2 mt-1">{description}</p>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{stock} in stock</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit?.(product)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 transition-colors"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={() => onDelete?.(product._id)}
                            className="p-1.5 text-slate-500 hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
