import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createOrder } from '../services/api';

const OrderModal = ({ product, onClose, t }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        address: '',
        quantity: 1,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await createOrder({
                ...formData,
                productId: product.id,
            });
            onClose(true); // pass true to indicate successful order
        } catch (err) {
            setError('Failed to submit order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-darkbrown/40 backdrop-blur-sm transition-opacity"
                onClick={() => onClose(false)}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">

                {/* Header section with image */}
                <div className="h-32 relative">
                    <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-darkbrown/90 to-transparent" />
                    <button
                        onClick={() => onClose(false)}
                        className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/40 backdrop-blur text-white rounded-full transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className="font-bold text-lg truncate">{product.name}</h3>
                        <p className="text-gold font-medium">${product.price}</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

                    <div>
                        <label className="block text-sm font-medium text-darkbrown/80 mb-1">{t.customerName}</label>
                        <input
                            required
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-darkbrown/80 mb-1">{t.phone}</label>
                        <input
                            required
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                            placeholder="+1 234 567 8900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-darkbrown/80 mb-1">{t.address}</label>
                        <textarea
                            required
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="2"
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all resize-none placeholder:text-gray-400"
                            placeholder="123 Bakery St..."
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-darkbrown/80">{t.quantity}</label>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, quantity: Math.max(1, p.quantity - 1) }))}
                                className="w-8 h-8 rounded-full bg-cream text-darkbrown flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
                                disabled={formData.quantity <= 1}
                            >
                                -
                            </button>
                            <span className="font-bold w-4 text-center">{formData.quantity}</span>
                            <button
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, quantity: p.quantity + 1 }))}
                                className="w-8 h-8 rounded-full bg-cream text-darkbrown flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">{t.total}</p>
                            <p className="text-xl font-bold text-darkbrown">${(product.price * formData.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => onClose(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                            >
                                {t.cancel}
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gold hover:bg-honey text-white px-6 py-2 rounded-xl font-bold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100"
                            >
                                {isSubmitting ? '...' : t.submit}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
