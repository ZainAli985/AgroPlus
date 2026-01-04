import React, { useState } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import { useNavigate } from "react-router-dom";
import NewYearSplash from "../layout/NewYearSplash.jsx";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notificationMessage, setnotificationMessage] = useState('');
  const [notificationType, setnotificationType] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username !== '' && password !== '') {
      try {
        const res = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.ok) {
          setnotificationMessage(data.message);
          setnotificationType('success');
          navigate('/dashboard');
        } else {
          setnotificationMessage(data.message);
          setnotificationType('error');
        }

        setTimeout(() => setnotificationMessage(''), 3000);
      } catch (err) {
        setnotificationMessage('SERVER ERROR CONTACT DEV');
        setnotificationType('warning');
        setTimeout(() => setnotificationMessage(''), 3000);
      }
    } else {
      setnotificationMessage('KINDLY FILL IN ALL FIELDS');
      setnotificationType('warning');
      setTimeout(() => setnotificationMessage(''), 3000);
    }
  };

return (
  <>
    {/* {showSplash && (
      <NewYearSplash onFinish={() => setShowSplash(false)} />
    )} */}
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Dark Professional Gradient with rice grain textures */}
      <div className="hidden md:flex md:w-1/2 bg-linear-to-br from-gray-900 to-gray-700 items-center justify-center relative overflow-hidden">
        {/* Rice grains / crop shapes as subtle background */}
        <svg className="absolute top-10 left-10 w-64 h-64 opacity-10" viewBox="0 0 100 100" fill="none">
          <ellipse cx="20" cy="20" rx="3" ry="8" fill="white" transform="rotate(-30 20 20)" />
          <ellipse cx="50" cy="40" rx="4" ry="10" fill="white" transform="rotate(20 50 40)" />
          <ellipse cx="70" cy="25" rx="2" ry="6" fill="white" transform="rotate(-15 70 25)" />
          <ellipse cx="80" cy="80" rx="3" ry="8" fill="white" transform="rotate(10 80 80)" />
        </svg>

        <svg className="absolute bottom-10 right-10 w-72 h-72 opacity-10" viewBox="0 0 100 100" fill="none">
          <ellipse cx="25" cy="25" rx="2" ry="6" fill="white" transform="rotate(-20 25 25)" />
          <ellipse cx="50" cy="50" rx="3" ry="8" fill="white" transform="rotate(15 50 50)" />
          <ellipse cx="75" cy="75" rx="2.5" ry="7" fill="white" transform="rotate(-10 75 75)" />
        </svg>

        <div className="text-center z-10 px-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-36 h-36 mx-auto rounded-full shadow-lg mb-6"
          />
          <h1 className="text-5xl font-extrabold mb-3 tracking-wide text-gray-100 drop-shadow-md">
            AL REHMAN RICE MILL
          </h1>
          <p className="text-gray-300 text-xl font-medium">
            The Heart of Fine Rice
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-gray-200">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
            BACK TO BUSINESS
          </h2>

          <form className="space-y-6">
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter Your Username"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-700 focus:outline-none shadow-sm transition duration-300"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-700 focus:outline-none shadow-sm transition duration-300"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              onClick={handleLogin}
              className="w-full bg-linear-to-r from-gray-800 to-gray-700 text-white py-3 rounded-xl font-bold shadow-lg hover:from-gray-900 hover:to-gray-800 transition duration-300"
            >
              LOGIN
            </button>
          </form>

          <div className="text-center mt-6 text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AL REHMAN RICE MILL. All rights reserved.
          </div>
        </div>
      </div>

      {/* Notification */}
      <Notification message={notificationMessage} type={notificationType} />
     </div>
  </>
);

}