import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, verifyOtp } from "../services/authService.js";
import OtpInput from "../components/OtpInput.jsx";

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [signupLoading, setSignupLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setEmailError(false);
        setOtpError("");
        setSignupLoading(true);
        try {
            const response = await registerUser({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation,
            });
            if (response.success) {
                setShowOtp(true);
            } else {
                setErrorMsg(response.message || "Signup failed.");
            }
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data && error.response.data.errors) {
                setErrorMsg(error.response.data.errors[0]?.msg || "Invalid input.");
            } else {
                setErrorMsg("User already exists. Please try another.");
            }
        } finally {
            setSignupLoading(false);
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleOtpVerify = async () => {
        console.log('Verify OTP button clicked');
        setOtpLoading(true);
        setOtpError("");
        try {
            const response = await verifyOtp(credentials.email, otp);
            if (response.success) {
                setShowOtp(false);
                navigate("/login");
            } else {
                setOtpError(response.message || "Invalid OTP.");
            }
        } catch (error) {
            setOtpError("Invalid or expired OTP.");
        } finally {
            setOtpLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Signup</h2>
                {errorMsg && (
                    <div className="mb-4 text-red-600 text-center font-semibold">{errorMsg}</div>
                )}
                {!showOtp ? (
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
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition ${signupLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={signupLoading}
                        >
                            {signupLoading ? 'Signing up...' : 'Signup'}
                        </button>
                        <div className="text-center">
                            <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
                        </div>
                    </form>
                ) : (
                    <>
                        <OtpInput otp={otp} setOtp={setOtp} onVerify={handleOtpVerify} loading={otpLoading} />
                        {otpError && <div className="mt-2 text-red-600 text-center font-semibold">{otpError}</div>}
                    </>
                )}
            </div>
        </div>
    );
}