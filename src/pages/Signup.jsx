import { useState } from "react";
import React from "react";
import { registerUser } from "../services/authService.js";
import { Link } from "react-router-dom";

export default function Signup() {
const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
});

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await registerUser({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.geolocation,
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
};

const handleChange = (e) => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
    });
};

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Signup</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={credentials.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="text"
                    name="geolocation"
                    placeholder="Geolocation"
                    value={credentials.geolocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">Signup</button>
                <div className="text-center">
                    <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
                </div>
            </form>
        </div>
    </div>
);
}