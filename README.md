# 🍔 Food Delivery App – Frontend

A modern food delivery web application built using React (Vite) with dynamic cart management, Razorpay payment integration, and full backend API connectivity.

## 🚀 Live Demo

### 🔗 Deployed on Vercel:
[https://your-project-name.vercel.app](https://food-delivery-frontend-rho-pink.vercel.app/)

## 🛠 Tech Stack

React (Vite)

React Router DOM

Axios

Tailwind CSS

Context API (State Management)

Razorpay Payment Gateway

JWT Authentication

## ✨ Features
### 🔐 Authentication

User Registration & Login

JWT-based authentication

Protected routes

Logout functionality

### 🍽 Menu System

Dynamic food items fetched from backend

Category-based filtering

Pagination support

Search functionality

### 🛒 Cart System

Add to cart

Remove from cart

Dynamic quantity control (+ / - buttons)

Cart sync with backend database

Auto-clear cart after successful payment

### 💳 Payment Integration

Razorpay integration

Secure payment flow

Backend payment verification

Order creation after successful payment

### 📦 Orders

My Orders page

Displays:

Order ID

Items

Quantity

Total amount

Order status

## 📁 Project Structure
src/
│
├── api/            # API calls (axios configuration)
├── components/     # Reusable components
├── context/        # Cart & Auth context
├── pages/          # Page components (Home, Cart, Orders)
├── routes/         # Protected routes logic
└── App.jsx
## ⚙️ Environment Variables

Create a .env file in the root directory:

VITE_API_URL=[https://your-backend-url.onrender.com/api](https://food-delivery-backend-p8gs.onrender.com)
VITE_RAZORPAY_KEY=rzp_test_SJwaOM7vJufiUI
## 🖥 Installation & Setup

Clone the repository:

git clone [https://github.com/your-username/your-repo.git](https://github.com/Ishitatiwari06/Food-Delivery-Frontend)
cd frontend

Install dependencies:

npm install

Run locally:

npm run dev

Build for production:

npm run build
## 🌍 Deployment

Frontend is deployed on:

Vercel

Steps:

Connect GitHub repo to Vercel

Add environment variables

Deploy

## 🔒 Security Practices

JWT stored securely

Sensitive keys stored in environment variables

Payment verification handled in backend

CORS properly configured

## 📌 Future Improvements

Admin dashboard

Order status tracking

Coupons & discounts

Address management

Reviews & ratings

Real-time order updates

👨‍💻 Author

Your Name
Full Stack Developer
