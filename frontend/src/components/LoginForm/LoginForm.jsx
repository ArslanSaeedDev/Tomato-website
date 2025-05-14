import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginForm.css";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let apiUrl = url;

    if (currState === "Login") {
      apiUrl += "/api/user/login";
    } else {
      apiUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(apiUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        toast.success(
          currState === "Login"
            ? "Successfully Logged In!"
            : "Successfully Registered!"
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popoup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? null : (
            <input
              type="text"
              placeholder="Your Name"
              required
              name="name"
              onChange={onChangeHandler}
              value={data.name}
            />
          )}
          <input
            type="text"
            placeholder="Your Email"
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
          />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            onChange={onChangeHandler}
            value={data.password}
          />
        </div>
        <button type="submit">
          {currState === "SignUp" ? "Create account" : "Login"}
        </button>
        <div className="loginpopup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("SignUp")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
