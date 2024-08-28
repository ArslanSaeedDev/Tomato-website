import React, { useContext, useState } from "react";
import { assets } from "./../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

function Navbar({ setShowLogin }) {
  const navigate = useNavigate();
  const [menu, setmenu] = useState("Home");
  const { token ,setToken,getTotalCartAmount } = useContext(StoreContext);

  const logout=()=>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  
  }
  
  return (
    <div className="navbar" id="navbar">
      <div>
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-link ">
        <ul>
          <Link to="/"> 
          <li
            onClick={() => setmenu("Home")}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </li>
          </Link>
          
          <a href="#explore-menu"> <li
            onClick={() => setmenu("Menu")}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </li></a>
         <a href="#footer">
         <li
            onClick={() => setmenu("Contact Us")}
            className={menu === "Contact Us" ? "active" : ""}
          >
            Contact Us
          </li>
         </a>
        
         
        </ul>
      </div>
      <div className="navbar-icon">
        <div>
          <img src={assets.search_icon} alt="" />
        </div>
        <div className="basket-icon">
          <Link to="/cart">
            {" "}
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {
  !token ? (
    <button onClick={() => setShowLogin(true)} className="sign-btn">
    Sign Up
  </button>
  ) : (
     <button onClick={logout} className="sign-btn">
      Logout
    </button>
  )
}
        
      </div>
    </div>
  );
}

export default Navbar;
