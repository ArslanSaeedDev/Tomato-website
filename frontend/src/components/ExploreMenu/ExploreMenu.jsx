import React, { useRef } from "react";
import "./ExploreMenu.css";
import { menu_list } from "./../../assets/assets";

function ExploreMenu({ category, setCategry }) {
  const scrollRef = useRef(null);

  const handleMouseDown = (e) => {
    scrollRef.current.isDown = true;
    scrollRef.current.startX = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    scrollRef.current.isDown = false;
  };

  const handleMouseUp = () => {
    scrollRef.current.isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!scrollRef.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - scrollRef.current.startX) * 3; // Multiply to increase scroll speed
    scrollRef.current.scrollLeft = scrollRef.current.scrollLeft - walk;
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Menu</h1>
      <p className="menu-text">
        Culinary adventure with our diverse menu that brings together the
        freshest ingredients and bold flavors.
      </p>
      <div
        className="explore-menu-list"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategry((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            key={index}
            className="explore-menu-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
