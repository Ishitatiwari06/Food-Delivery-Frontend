
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/ContextReducer.jsx";

function App() {
  return (
      <CartProvider>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myorder" element={<MyOrder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
