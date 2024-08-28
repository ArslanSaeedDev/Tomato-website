import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../components/context/StoreContext";
import Invoice from "../../components/invoice/Invoice";
import { useNavigate } from "react-router-dom";


function Cart() {
  const { cartItem, removeFromCart, food_list, getTotalCartAmount ,url} = useContext(StoreContext);
  const [showInvoice, setShowInvoice] = useState(false); // State to control Invoice rendering
  const navigate = useNavigate();

  const handlePrintInvoice = () => {
   
    setShowInvoice(true);
  };

  return (
    <div className="cart">
      {showInvoice ? (
        <Invoice/> // Conditionally render Invoice component
      ) : (
        <>
          <div className="cart-item">
            <div className="cart-item-title">
              <p>Item</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <br />
            <hr />
            {food_list.map((item, index) => {
              if (cartItem[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className="cart-item-title cart-item-titles ">
                      <img src={url+"/images/"+item.image} alt="" />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p className="quantity">{cartItem[item._id]}</p>
                      <p>${item.price * cartItem[item._id]}</p>
                      <p onClick={() => removeFromCart(item._id)} className="cross">
                        x
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
            })}
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
          </div>
          <div className="cart-btn-container">
          <button className="cart-btn" id="cart-btn" onClick={handlePrintInvoice}>Print  Invoice</button>
          <button className="cart-btn"onClick={()=>navigate("/order")} > Check Proceed Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
