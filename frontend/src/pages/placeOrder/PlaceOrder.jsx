import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/context/StoreContext";

function PlaceOrder() {
  const {getTotalCartAmount}=useContext(StoreContext);
  return (
    <div className="place-order">
      <div className="place-order-left">
        <p className="title"> Delivery Information</p>
      
        <div className="multi-field">
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
      </div>
      
        <input type="text" placeholder="Email Adress" />
        <input type="text" placeholder="Street" />

        <div className="multi-field">
        <input type="text" placeholder="City" />
        <input type="text" placeholder="State" />
      </div>
     
      <div className="multi-field">
        <input type="text" placeholder="Zip Code" />
        <input type="text" placeholder="Country" />
      </div>
      <input type="text" placeholder="Phone" />
      </div>
      

    
          <div className="cart-bottom">
            <div className="cart-total-heading">
              <h2>Cart Total</h2>
            </div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <p>{getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</p>
            </div>
          <button className="cart-btn" > Payment Proceed</button>
          </div>
          
         
          </div>
   
  );
}

export default PlaceOrder;
