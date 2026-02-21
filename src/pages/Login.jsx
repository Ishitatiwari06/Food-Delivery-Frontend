import React from "react";
import { useState } from "react";
import { loginUser } from "../services/authService.js";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
const handleChange2 = (e) => {
    setCredentials({
      ...credentials,
      rememberMe: e.target.checked,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
                <form className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                    </label>
                    <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={credentials.email}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    </div>
                    <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={credentials.password}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            checked={credentials.rememberMe}
                            onChange={handleChange2}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                            Remember me
                        </label>
                    </div>
                    {/* <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </a>
                    </div> */}
                </div>
                <div className="mt-6">
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Sign in
                    </button>
                </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Sign up
                </Link>
                </p>
            </div>
        </div>
    );
}

