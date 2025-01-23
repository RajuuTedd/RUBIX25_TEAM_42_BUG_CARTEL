import React, { useState } from 'react';

const DietaryOptions = [
  'Vegetarian', 
  'Vegan', 
  'Gluten-Free', 
  'Dairy-Free', 
  'Kosher', 
  'Halal'
];

const SignupForm = () => {
  const [signupType, setSignupType] = useState('donor');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    contactMethod: 'email'
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    setFormData(prev => {
      const currentValues = prev[name] || [];
      return {
        ...prev,
        [name]: checked 
          ? [...currentValues, value]
          : currentValues.filter(item => item !== value)
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.emailAddress) newErrors.emailAddress = 'Email Address is required';

    if (signupType === 'donor' && !formData.accountType) {
      newErrors.accountType = 'Account Type is required';
    }

    if (signupType === 'recipient' && !formData.organizationType) {
      newErrors.organizationType = 'Organization Type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        console.log('Signup Data:', formData);
        alert('Signup Successful!');
      } catch (error) {
        console.error('Signup Error:', error);
        alert('Signup Failed');
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
              onClick={() => setSignupType('donor')}
              className={`flex items-center justify-center py-3 rounded-lg transition-all duration-300 ${
                signupType === 'donor' 
                  ? 'bg-white shadow-md text-emerald-600 scale-105' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Donor
            </button>
            <button
              onClick={() => setSignupType('recipient')}
              className={`flex items-center justify-center py-3 rounded-lg transition-all duration-300 ${
                signupType === 'recipient' 
                  ? 'bg-white shadow-md text-emerald-600 scale-105' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Recipient
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
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

            {/* Donor Specific Fields */}
            {signupType === 'donor' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <select
                    name="accountType"
                    value={formData.accountType || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border-2 rounded-lg"
                  >
                    <option value="">Select Account Type</option>
                    <option value="individual">Individual</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="grocery">Grocery Store</option>
                    <option value="other">Other</option>
                  </select>
                  {formData.accountType === 'other' && (
                    <input
                      type="text"
                      name="otherAccountType"
                      value={formData.otherAccountType || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border-2 rounded-lg mt-2"
                      placeholder="Specify Account Type"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Restrictions (if donating prepared food)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {DietaryOptions.map(option => (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="dietaryRestrictions"
                          value={option}
                          onChange={handleCheckboxChange}
                          className="form-checkbox"
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Recipient Specific Fields */}
            {signupType === 'recipient' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border-2 rounded-lg"
                    placeholder="Enter organization name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Type
                  </label>
                  <select
                    name="organizationType"
                    value={formData.organizationType || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border-2 rounded-lg"
                  >
                    <option value="">Select Organization Type</option>
                    <option value="food-bank">Food Bank</option>
                    <option value="soup-kitchen">Soup Kitchen</option>
                    <option value="shelter">Shelter</option>
                    <option value="community-center">Community Center</option>
                    <option value="other">Other</option>
                  </select>
                  {formData.organizationType === 'other' && (
                    <input
                      type="text"
                      name="otherOrganizationType"
                      value={formData.otherOrganizationType || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border-2 rounded-lg mt-2"
                      placeholder="Specify Organization Type"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Dietary Needs
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {DietaryOptions.map(option => (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="recipientDietaryNeeds"
                          value={option}
                          onChange={handleCheckboxChange}
                          className="form-checkbox"
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Contact Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['email', 'phone', 'in-app']).map(method => (
                  <label key={method} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={formData.contactMethod === method}
                      onChange={handleInputChange}
                      className="form-radio"
                    />
                    <span className="ml-2">{method.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
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