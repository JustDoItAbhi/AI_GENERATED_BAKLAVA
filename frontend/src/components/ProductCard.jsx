import React from 'react';

const ProductCard = ({ product, onOrder, t }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-amber-50">
            <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-darkbrown/10 group-hover:bg-transparent transition-colors z-10" />
                <img
                    src={product.image || "/images/mix.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm z-20">
                    <span className="font-bold text-darkbrown">${product.price}</span>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-darkbrown mb-2 line-clamp-2">{product.name}</h3>
                <button
                    onClick={() => onOrder(product)}
                    className="mt-auto w-full bg-gold hover:bg-honey text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    {t.order}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
