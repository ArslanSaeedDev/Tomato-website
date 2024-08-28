import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-content" id="header-content">
        <h2>Order Your Favourite Food Here</h2>
        <p>
          Indulge in a culinary adventure with our diverse menu that brings
          together the freshest ingredients and bold flavors. Whether you're
          craving a hearty meal, a light bite, or a sweet treat, our dishes are
          crafted to satisfy every palate
        </p>
        <button
          id="header-btn"
        
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

export default Header;
