import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import OrderModal from '../components/OrderModal';
import { getProducts } from '../services/api';

const CustomerPage = ({ t }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleOrderSubmit = (success) => {
        setSelectedProduct(null);
        if (success) {
            setOrderSuccess(true);
            setTimeout(() => setOrderSuccess(false), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-cream/30 pb-20">
            {/* Hero Section */}
            <div className="relative bg-darkbrown text-white py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/fullplate.jpg"
                        alt="Bakery Banner"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-darkbrown/60 to-darkbrown/90" />
                </div>
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gold drop-shadow-md tracking-tight">
                        {t.subtitle}
                    </h1>
                    <p className="text-xl md:text-2xl text-cream/90 font-light">
                        Indulge in the rich flavors of authentically crafted sweets
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                {orderSuccess && (
                    <div className="mb-8 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 shadow-sm flex items-center justify-center font-medium animate-in fade-in slide-in-from-top-4">
                        🎉 Order placed successfully!
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onOrder={() => setSelectedProduct(product)}
                                t={t}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Order Modal */}
            {selectedProduct && (
                <OrderModal
                    product={selectedProduct}
                    onClose={handleOrderSubmit}
                    t={t}
                />
            )}
        </div>
    );
};

export default CustomerPage;
