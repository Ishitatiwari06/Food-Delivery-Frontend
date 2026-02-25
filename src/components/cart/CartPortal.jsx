import { createPortal } from "react-dom";
import { useCart, useDispatchCart } from "../../context/ContextReducer.jsx";
import CartItem from "./CartItem.jsx";


const CartPortal = ({ isOpen, onClose }) => {
  const cart = useCart();

  if (!isOpen) return null;

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  return createPortal(
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      {/* Drawer */}
      <div className="w-96 bg-white h-full p-5 shadow-lg overflow-y-auto">
        <button
          onClick={onClose}
          className="mb-4 text-red-500 font-bold"
        >
          Close ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item) => (
            <CartItem key={item.foodItem + '-' + item.size} item={item} />
          ))
        )}

        <div className="mt-5 border-t pt-3">
          <h3 className="font-bold text-lg mb-4">
            Total: ₹{totalPrice}
          </h3>
          <button
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200 font-semibold tracking-wide"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default CartPortal;