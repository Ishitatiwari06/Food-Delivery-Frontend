import React, { createRef, useEffect, useState } from "react";
import { useCart, useDispatchCart } from "../context/ContextReducer.jsx";

export default function Card(props) {
  let options = props.options[0];
  let priceOptions = Object.keys(options);
  const [size, setSize] = useState("");
  const priceRef = createRef();
  const dispatch = useDispatchCart();
  const cart = useCart();

  // Find if this item+size is in cart
  const cartItem = cart.find(
    (item) => item.foodItem === props._id && item.size === size
  );
  const qty = cartItem ? cartItem.qty : 1;

  let finalPrice = qty * parseInt(options[size] || 0);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddtoCart = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please login to add items to your cart.");
      return;
    }
    await dispatch.addItem({
      foodItem: props._id,
      name: props.name,
      price: parseInt(options[size]),
      qty: 1,
      size: size,
      img: props.img,
    });
  };

  const handleIncrement = async () => {
    await dispatch.updateQuantity({
      foodItem: props._id,
      size: size,
      qty: qty + 1,
    });
  };

  const handleDecrement = async () => {
    if (qty === 1) {
      await dispatch.removeItem({ foodItem: props._id, size: size });
    } else {
      await dispatch.updateQuantity({
        foodItem: props._id,
        size: size,
        qty: qty - 1,
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mt-16 mb-32 bg-white rounded-2xl shadow-xl w-80 h-[440px] flex flex-col hover:scale-105 transition-transform duration-300">
        <img src={props.img} className="w-full h-48 object-cover rounded-t-2xl" alt="..." />
        <div className="p-5 flex-1 flex flex-col">
          <h5 className="text-xl font-bold mb-2 text-gray-800 truncate">{props.name}</h5>
          <p className="text-gray-500 mb-4 line-clamp-2 text-sm">{props.description}</p>
          <div className="flex w-full space-x-3 mt-auto items-center">
            <select
              className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 text-gray-700"
              ref={priceRef}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="font-semibold text-green-600 text-lg whitespace-nowrap">
              Rs. {isNaN(finalPrice) ? 0 : finalPrice}/-
            </div>
          </div>
          {!cartItem ? (
            <button
              className="mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-semibold tracking-wide"
              onClick={handleAddtoCart}
            >
              Add to Cart
            </button>
          ) : (
            <div className="mt-6 flex items-center gap-3">
              <button
                className="bg-gray-200 px-3 py-1 rounded-full text-lg font-bold hover:bg-gray-300"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="font-semibold text-lg">{qty}</span>
              <button
                className="bg-gray-200 px-3 py-1 rounded-full text-lg font-bold hover:bg-gray-300"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
