import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { 
//   LockClosedIcon, 
//   MailIcon, 
//   UserIcon 
// } from '@heroicons/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
  
      console.log("Login successful", data);
  
      // Save token to localStorage or use it as needed
      localStorage.setItem("token", data.token);
      // Optionally redirect the user
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.message);
      alert(err.message);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6 
        transform transition-all duration-300 hover:scale-[1.02]">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-emerald-600 flex items-center justify-center gap-2 mb-2">
            {/* <UserIcon className="h-8 w-8" /> */}
            Food Fire-brigade
          </h1>
          <p className="text-gray-500">Rescuing Food, Feeding Hope</p>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              {/* <MailIcon 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 
                  h-5 w-5 text-gray-400" 
              /> */}
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-emerald-300 
                  focus:border-emerald-500 transition-all duration-300"
              />
            </div>
          </div>
          
          {/* Password Input */}
          <div className="relative">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              {/* <LockClosedIcon 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 
                  h-5 w-5 text-gray-400" 
              /> */}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-emerald-300 
                  focus:border-emerald-500 transition-all duration-300"
              />
            </div>
          </div>
          
          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 
                  border-gray-300 rounded transition duration-300"
              />
              <label 
                htmlFor="remember" 
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a 
                href="#" 
                className="font-medium text-emerald-600 hover:text-emerald-500 
                  transition duration-300"
              >
                Forgot password?
              </a>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 
              text-white py-2.5 rounded-lg hover:from-emerald-700 hover:to-teal-600 
              focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
              transition-all duration-300 transform hover:scale-[1.01] 
              flex items-center justify-center gap-2"
          >
            {/* <LockClosedIcon className="h-5 w-5" /> */}
            Sign In
          </button>
        </form>
        
        {/* Sign Up Link */}
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a 
            href="#" 
            className="font-medium text-emerald-600 hover:text-emerald-500 
              transition duration-300"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;