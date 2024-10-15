import { useState } from "react";
import { login, signup } from "./apiCall";
import Loading from "../components/Loading";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [isLoading, setIsLoading] = useState(false); // Toggle between login and signup
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate input fields
  const validate = () => {
    let usernameError = "";
    let passwordError = "";

    if (formData.username.length < 6) {
      usernameError = "Username must be at least 6 characters.";
    }

    if (formData.password.length < 6) {
      passwordError = "Password must be at least 6 characters.";
    }

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      return false;
    }

    setErrors({ username: "", password: "" });
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isValid = validate();
    if (isValid) {
      if (isLogin) {
        const data = await login(formData);
        if (data?.token) {
          localStorage.setItem("authToken", data.token);
          window.location.href = "/book-movie";
        }
      } else {
        const data = await signup(formData);
        if (data?.token) {
          localStorage.setItem("authToken", data.token);
          window.location.href = "/book-movie";
        }
        console.log(data);
      }
      setIsLoading(false);
      setFormData({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:border-blue-500`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle between Login and Signup */}
        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
          <br />
          {<Loading loading={isLoading} />}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
