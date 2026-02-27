
import { createPortal } from "react-dom";
import { useCart, useDispatchCart } from "../../context/ContextReducer.jsx";
import CartItem from "./CartItem.jsx";
import { createRazorpayOrder, verifyPayment } from "../../services/authService.js";
import { useNavigate } from "react-router-dom";


const CartPortal = ({ isOpen, onClose }) => {
  const cart = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handlePayment = async () => {
    const response = await createRazorpayOrder({
      amount: totalPrice * 100,
      currency: "INR",
    });
    const { order } = response;
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      name: "Food Delivery",
      order_id: order.id,
      handler: async (response) => {
        const data = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        await verifyPayment(data);
        await dispatch.clearCart();
        navigate("/myorders");
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
};
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
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg shadow-md transition-all duration-200 font-semibold text-lg tracking-wide mt-2"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default CartPortal;