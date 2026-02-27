import React, { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService.js";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getMyOrders();
        setOrders(Array.isArray(response) ? response.slice().reverse() : []);
      } catch (err) {
        setError("Error fetching orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">My Orders</h1>
      {loading ? (
        <div className="text-gray-500">Loading orders...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500">You have no orders yet.</div>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order._id} className="border border-orange-200 p-5 rounded-xl shadow-md bg-white">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-pink-700">Order #{order._id.slice(-6)}</h2>
                <span className="text-xs text-gray-400">{order.status || "Processing"}</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">Placed on: {order.order_date}</p>
              <div>
                <h3 className="font-semibold mb-2">Items:</h3>
                <ul className="ml-4 list-disc">
                  {order.order_data.map((item, idx) => (
                    <li key={item.foodItem + '-' + idx} className="mb-1">
                      <span className="font-medium">{item.name}</span> x{item.quantity} ({item.size}) - ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              {order.totalAmount && (
                <div className="mt-3 font-bold text-green-700">Total: ₹{order.totalAmount}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrder;
