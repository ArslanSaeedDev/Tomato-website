import React, { useContext, useRef, useEffect } from "react";
import "./Invoice.css";
import { StoreContext } from "../context/StoreContext";

function Invoice() {
  const { cartItem, food_list, getTotalCartAmount } = useContext(StoreContext);
  const invoiceRef = useRef();

  useEffect(() => {
    console.log("Invoice component mounted");
    printInvoice();
  }, []);

  const printInvoice = () => {
    console.log("Printing invoice...");
    const printContents = invoiceRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="invoice" ref={invoiceRef}>
      <div className="cart-item1">
        <div className="owner-info">
          <h1>Zohaib Electrical Engineer</h1>
          <p>Chak No 319 H/R Maroot</p>
          <p>Cell 03464519319 : 03218323319</p>
          <p className="invoice-date">Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="invoice-item-title">
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={index}>
                <div className="invoice-item-title invoice-item-titles">
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p className="quantity">{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
        <div className="invoice-bottom">
          <div className="invoice-total-heading">
            <h2>Cart Total</h2>
          </div>
          <div className="invoice-total-detail">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="invoice-total-detail">
            <p>Delivery Fee</p>
            <p>$2</p>
          </div>
          <hr />
          <div className="invoice-total-detail">
            <b>Total</b>
            <p>${getTotalCartAmount() + 2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
