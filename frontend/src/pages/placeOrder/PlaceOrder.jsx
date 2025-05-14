import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { cartItem, food_list, getTotalCartAmount, url, setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    const items = [];

    for (const itemId in cartItem) {
      if (cartItem[itemId] > 0) {
        const item = food_list.find((i) => i._id === itemId);
        if (item) {
          items.push({
            itemId,
            name: item.name,
            price: item.price,
            quantity: cartItem[itemId]
          });
        }
      }
    }

    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 2;
    const totalAmount = subtotal + deliveryFee;

    const orderData = {
      customerInfo: formData,
      items,
      subtotal,
      deliveryFee,
      totalAmount
    };

    try {
      const res = await axios.post(`${url}/api/user/order`, orderData);
      if (res.status === 201) {
        alert("Order placed successfully!");
        setCartItems({}); // Clear cart
        navigate("/"); // Redirect to homepage or thank-you page
      }
    } catch (err) {
      console.error("Order placement failed", err);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} />
        </div>
        <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} />
        <input type="text" name="street" placeholder="Street" onChange={handleInputChange} />
        <div className="multi-field">
          <input type="text" name="city" placeholder="City" onChange={handleInputChange} />
          <input type="text" name="state" placeholder="State" onChange={handleInputChange} />
        </div>
        <div className="multi-field">
          <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleInputChange} />
          <input type="text" name="country" placeholder="Country" onChange={handleInputChange} />
        </div>
        <input type="text" name="phone" placeholder="Phone" onChange={handleInputChange} />
      </div>

      <div className="cart-bottom">
        <div className="cart-total-heading">
          <h2>Cart Total</h2>
        </div>
        <div className="cart-total-detail">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-detail">
          <p>Delivery Fee</p>
          <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
        </div>
        <hr />
        <div className="cart-total-detail">
          <b>Total</b>
          <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
        </div>
        <button className="cart-btn" onClick={handlePlaceOrder}>Payment Proceed</button>
      </div>
    </div>
  );
}

export default PlaceOrder;
