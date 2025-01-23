import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Kosher",
  "Halal",
];

const SignupForm = () => {
  const navigate =useNavigate();
  const [signupType, setSignupType] = useState("donor");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
    location: "",
    contactMethod: "email",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.emailAddress) newErrors.emailAddress = "Email Address is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.location) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        name: formData.fullName,
        email: formData.emailAddress,
        password: formData.password,
        phone: formData.phoneNumber,
        location: formData.location,
        role: signupType,
      };

      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", payload);
        alert("Signup Successful!");
        console.log("Signup Response:", response.data);
        navigate("/login");
      } catch (err) {
        console.error("Signup Error:", err.response?.data || err.message);
        alert("Signup Failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] duration-300 ease-in-out">
        <div className="p-6 bg-gradient-to-r from-teal-500 to-emerald-600">
          <h1 className="text-2xl font-bold text-center text-white drop-shadow-md">
            Food Rescue Platform Registration
          </h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-2 bg-gray-100 rounded-xl p-1 mb-6 shadow-inner">
            <button
              onClick={() => setSignupType("donor")}
              className={`flex items-center justify-center py-3 rounded-lg transition-all duration-300 ${
                signupType === "donor"
                  ? "bg-white shadow-md text-emerald-600 scale-105"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Donor
            </button>
            <button
              onClick={() => setSignupType("recipient")}
              className={`flex items-center justify-center py-3 rounded-lg transition-all duration-300 ${
                signupType === "recipient"
                  ? "bg-white shadow-md text-emerald-600 scale-105"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Recipient
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border-2 rounded-lg"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border-2 rounded-lg"
                placeholder="(123) 456-7890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border-2 rounded-lg"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border-2 rounded-lg"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border-2 rounded-lg"
                placeholder="Enter your location"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-lg 
              hover:from-emerald-700 hover:to-teal-600 
              transition-all duration-300 
              transform hover:scale-[1.01]"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
