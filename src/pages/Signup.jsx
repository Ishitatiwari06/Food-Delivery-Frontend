import { useState } from "react";
import React from "react";
import { registerUser } from "../services/authService.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
});
const [errorMsg, setErrorMsg] = useState("");
const [emailError, setEmailError] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setEmailError(false);
    try {
        const response = await registerUser({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.geolocation,
        });
        console.log(response);
        window.location.href = "/login";
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 400 && error.response.data && error.response.data.errors) {
            // Show first validation error
            setErrorMsg(error.response.data.errors[0]?.msg || "Invalid input.");
        } else {
            setErrorMsg("User already exists. Please try another.");
        }
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
            {errorMsg && (
                <div className="mb-4 text-red-600 text-center font-semibold">{errorMsg}</div>
            )}
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
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
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