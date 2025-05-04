import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "JobFlicker";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // LOGIN API
        const response = await axios.get(`http://localhost:3100/api/login`, {
          params: {
            email: formData.email,
            passwordHash: formData.password,
          },
        });

        if (response.data.message === "Login successful") {
          console.log("Logged in:", response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("user_id", response.data.user._id);
          if (response.data.user.role === "company") {
            navigate("/fillCompanyDetails");
          } else {
            navigate("/companies");
          }
        } else {
          alert(response.data.message);
        }
      } else {
        // SIGNUP API
        const signupPayload = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          passwordHash: formData.password,
        };

        const response = await axios.post(
          `https://jobflicker.onrender.com/api/users`,
          signupPayload
        );

        if (response.data.message === "User already exists") {
          alert("User already exists");
        } else {
          console.log("User created:", response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          if (response.data._id) {
            localStorage.setItem("user_id", response.data._id);
          }

          if (response.data.role === "company") {
            navigate("/fillCompanyDetails");
          } else {
            navigate("/companies");
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-green-700 text-center mb-8">
          JobFlicker
        </h1>

        <div className="bg-white p-8 rounded-lg shadow w-full border border-green-200">
          <h2 className="text-2xl font-semibold text-green-700 text-center mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    Company/User Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <option value="user">User</option>
                    <option value="company">Company</option>
                  </select>
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="text-sm text-center mt-4 text-green-700">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="text-green-600 font-semibold hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
