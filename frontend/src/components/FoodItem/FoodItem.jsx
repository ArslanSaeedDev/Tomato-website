import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
 
  const{cartItem,removeFromCart,addToCart,url}=useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={url+"/images/"+image} alt="" />
        {
          !cartItem[id]
          ?<img className="add" onClick={()=>addToCart(id)} src={assets.add_icon_white}/>
          :<div className="food-item-counter">
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItem[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="food-info">
      <div className="food-item-name-rating">
        <p>{name}</p>
        <img src={assets.rating_starts} alt="" />
      </div>
      <p className="food-item-des">{description}</p>
      <p className="food-item-price">${price}</p> 
    </div>
    </div>
  );
}

export default FoodItem;
 