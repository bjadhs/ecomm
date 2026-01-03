
export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category: string;
    averageRating: number;
    totalReviews: number;
    createdAt: string;
    updatedAt: string;
}

export interface Cart {
    _id: string;
    items: CartItem[];
    clerkId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    product: {
        _id: string;
        name: string;
        price: number;
        images: string[];
        stock: number;
    };
    quantity: number;
}

export interface Order {
    _id: string;
    items: Array<{
        product: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
    }>;
    totalPrice: number;
    status: 'pending' | 'shipped' | 'delivered';
    createdAt: string;
    deliveredAt?: string;
    shippedAt?: string;
}

export interface Address {
    _id?: string;
    label: string;
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
    phone: string;
    isDefault: boolean;
}