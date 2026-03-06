import React, { useEffect, useState } from 'react';
import { getOrders, completeOrder } from '../services/api';

const AdminPage = ({ t }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000); // Auto-refresh every 10s
        return () => clearInterval(interval);
    }, []);

    const handleComplete = async (orderId) => {
        try {
            await completeOrder(orderId);
            // Immediately update local state for fast UI response
            setOrders(orders.map(o =>
                o.id === orderId ? { ...o, status: 'Completed' } : o
            ));
        } catch (error) {
            console.error('Failed to complete order:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-cream/30 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream/30 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-darkbrown mb-8 hidden md:block">{t.orders}</h1>

                <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-amber-50">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t.orderId}</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t.customerName}</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t.phone} / {t.address}</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t.productName}</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t.orderTime}</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{t.status}</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                            No orders found
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-amber-50/30 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-l-4 border-transparent">
                                                #{order.id.slice(0, 8)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                                                {order.customerName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                                <div>{order.phone}</div>
                                                <div className="text-xs text-gray-400 truncate mt-1">{order.address}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                <div className="font-medium">{order.productName}</div>
                                                <div className="text-xs text-gray-500 mt-1">Qty: {order.quantity} • ${order.totalPrice}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(order.orderTime).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${order.status === 'Completed'
                                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                                        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                                {order.status !== 'Completed' && (
                                                    <button
                                                        onClick={() => handleComplete(order.id)}
                                                        className="bg-cream hover:bg-gold text-darkbrown hover:text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow transition-all"
                                                    >
                                                        {t.completed}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
