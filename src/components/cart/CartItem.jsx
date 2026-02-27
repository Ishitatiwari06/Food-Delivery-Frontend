import React from "react";
import { useDispatchCart } from "../../context/ContextReducer.jsx";

const CartItem = ({ item }) => {
  const dispatch = useDispatchCart();

  return (
    <div className="flex justify-between items-center mb-3 border-b pb-2">
      <div className="flex items-center gap-3">
        {item.img && (
          <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-full" />
        )}
        <div>
          <p className="font-medium">{item.name}</p>
          <p>Qty: {item.qty}</p>
          <p>Size: {item.size}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold text-green-700">₹{item.price * item.qty}</p>
        <button
          onClick={() => dispatch.removeItem({ foodItem: item.foodItem, size: item.size })}
          className="text-sm text-red-500 hover:underline mt-1"
        >
          <img src="https://i.pinimg.com/736x/b8/04/8e/b8048e4207a717d387630dc7dea9dc54.jpg" alt="delete" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
