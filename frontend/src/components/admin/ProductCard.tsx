import { Package, Edit2, Trash2 } from 'lucide-react';
import type { Product } from '../../types';

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
    const { _id, name, description, price, stock, category, images } = product;

    return (
        <div className="bg-(--bg-card) border border-(--border-color) rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col group">
            <div className="aspect-square bg-(--bg-hover)/50 flex items-center justify-center overflow-hidden relative">
                {images?.[0] ? (
                    <img
                        src={images[0]}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <Package size={40} strokeWidth={1.5} className="text-(--text-muted) opacity-50" />
                )}
            </div>


            <div className="p-4 flex-1 flex flex-col gap-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-(--text-main) truncate flex-1">{name}</h3>
                    <p className="font-bold text-(--text-main)">${price}</p>
                </div>

                <p className="text-xs text-(--text-muted) uppercase tracking-wider">{category}</p>
                <p className="text-sm text-(--text-muted) line-clamp-2 mt-1">{description}</p>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xs text-(--text-muted)">{stock} in stock</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(product)}
                            className="p-1.5 text-(--text-muted) hover:text-blue-600 transition-colors"
                            title="Edit Product"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(_id)}
                            className="p-1.5 text-(--text-muted) hover:text-red-600 transition-colors"
                            title="Delete Product"
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
