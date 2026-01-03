import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { addressApi, cartApi, orderApi } from '../lib/api';
import type { Address } from '../types';
import { Loader2, Plus, ArrowRight, Trash2, Edit2, CheckCircle } from 'lucide-react';

const AddressPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState<Address>({
        _id: '',
        label: '',
        fullName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        isDefault: false
    });

    // Queries
    const { data: addresses, isLoading: isLoadingAddresses } = useQuery({
        queryKey: ['addresses'],
        queryFn: addressApi.getAddresses,
    });

    const { data: cart } = useQuery({
        queryKey: ['cart'],
        queryFn: cartApi.getCart,
    });

    // Mutations
    const addAddressMutation = useMutation({
        mutationFn: addressApi.addAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            setIsAddingNew(false);
            resetForm();
        },
    });

    const updateAddressMutation = useMutation({
        mutationFn: ({ id, address }: { id: string; address: Partial<Address> }) =>
            addressApi.updateAddress(id, address),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            setEditingId(null);
            resetForm();
        },
    });

    const deleteAddressMutation = useMutation({
        mutationFn: addressApi.deleteAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
        },
    });

    const checkoutMutation = useMutation({
        mutationFn: orderApi.createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            navigate('/orders'); // Or success page
        },
        onError: (err) => {
            console.error("Order creation failed", err);
            // Optionally show toast/error
        }
    });

    const resetForm = () => {
        setFormData({
            _id: '',
            label: '',
            fullName: '',
            streetAddress: '',
            city: '',
            state: '',
            zipcode: '',
            phone: '',
            isDefault: false
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { _id, ...addressData } = formData;
        console.log("Submitting Address Data:", addressData);

        if (editingId) {
            updateAddressMutation.mutate({ id: editingId, address: addressData });
        } else {
            addAddressMutation.mutate(addressData);
        }
    };

    const handleEdit = (address: Address) => {
        setEditingId(address._id || '');
        setFormData({
            _id: address._id,
            label: address.label,
            fullName: address.fullName,
            streetAddress: address.streetAddress,
            city: address.city,
            state: address.state,
            zipcode: address.zipcode,
            phone: address.phone,
            isDefault: address.isDefault
        });
        setIsAddingNew(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            if (addresses && selectedAddressIndex !== null) {
                setSelectedAddressIndex(null);
            }
            deleteAddressMutation.mutate(id);
        }
    };

    const handlePlaceOrder = () => {
        if (selectedAddressIndex === null || !addresses) return;
        const cartItems = cart?.items || [];
        if (cartItems.length === 0) {
            return;
        }
        const selectedAddress = addresses?.find((address) => address._id === selectedAddressIndex);

        const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const shipping = 0;
        const tax = subtotal * 0.1;
        const total = subtotal + shipping + tax;

        const orderData = {
            items: cartItems.map(item => ({
                product: item.product._id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                image: item.product.images?.[0]
            })),
            totalPrice: total,
            shippingAddress: selectedAddress,
            paymentResult: {
                id: `SIM-${Date.now()}`,
                status: "paid",
                update_time: new Date().toISOString(),
                email_address: "simple@example.com"
            }
        };

        checkoutMutation.mutate(orderData);
    };

    if (isLoadingAddresses) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <Loader2 className='w-12 h-12 animate-spin text-(--color-primary)' />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Select Delivery Address</h1>

                {/* Address List */}
                <div className="grid gap-6 mb-8">
                    {addresses?.map((address: any, index: number) => (
                        <div
                            key={address._id || index}
                            className={`relative bg-white p-6 rounded-lg shadow-sm border-2 cursor-pointer transition-all ${selectedAddressIndex === address._id
                                ? 'border-(--color-primary) ring-1 ring-(--color-primary)'
                                : 'border-transparent hover:border-gray-200'
                                }`}
                            onClick={() => setSelectedAddressIndex(address._id)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${selectedAddressIndex === address._id
                                        ? 'border-(--color-primary) bg-(--color-primary)'
                                        : 'border-gray-300'
                                        }`}>
                                        {selectedAddressIndex === address._id && <CheckCircle className="w-3 h-3 text-white" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-lg">{address.label}</span>
                                            {address.isDefault && (
                                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">Default</span>
                                            )}
                                        </div>
                                        <p className="font-medium text-gray-900">{address.fullName}</p>
                                        <p className="text-gray-600">{address.streetAddress}</p>
                                        <p className="text-gray-600">{address.city}, {address.state} {address.zipcode}</p>
                                        <p className="text-gray-600 mt-1">Phone: {address.phone}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEdit(address); }}
                                        className="p-2 text-gray-400 hover:text-(--color-primary) transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(address._id); }}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add New Address Toggle */}
                {!isAddingNew && (
                    <button
                        onClick={() => { setIsAddingNew(true); setEditingId(null); resetForm(); }}
                        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-(--color-primary) hover:text-(--color-primary) flex items-center justify-center gap-2 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Address
                    </button>
                )}

                {/* Address Form */}
                {isAddingNew && (
                    <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                        <h2 className="text-2xl font-semibold mb-6">{editingId ? 'Edit Address' : 'Add New Address'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput name="label" value={formData.label} onChange={handleInputChange} placeholder="Label (e.g., Home, Work)" required />
                                <FormInput name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" required />
                                <FormInput name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} placeholder="Street Address" className="md:col-span-2" required />
                                <FormInput name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required />
                                <FormInput name="state" value={formData.state} onChange={handleInputChange} placeholder="State" required />
                                <FormInput name="zipcode" value={formData.zipcode} onChange={handleInputChange} placeholder="Zip Code" required />
                                <FormInput name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" required />
                            </div>
                            <div className="mt-6 flex gap-3">
                                <button
                                    type="submit"
                                    disabled={addAddressMutation.isPending || updateAddressMutation.isPending}
                                    className="bg-(--color-primary) hover:opacity-90 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                                >
                                    {(addAddressMutation.isPending || updateAddressMutation.isPending) && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {editingId ? 'Update Address' : 'Save Address'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddingNew(false)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Action Footer */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg lg:static lg:bg-transparent lg:border-none lg:shadow-none lg:mt-8">
                    <div className="max-w-4xl mx-auto flex justify-end">
                        <button
                            onClick={handlePlaceOrder}
                            disabled={selectedAddressIndex === null || checkoutMutation.isPending}
                            className="w-full lg:w-auto bg-(--color-primary) text-white py-3 px-8 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-(--color-primary)/20"
                        >
                            {checkoutMutation.isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Place Order <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormInput = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-primary)/50 focus:border-(--color-primary) transition-all ${className}`}
        {...props}
    />
);

export default AddressPage;
