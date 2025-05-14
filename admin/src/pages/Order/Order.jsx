// pages/admin/Order.jsx
import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';

function Order() {
  const [orders, setOrders] = useState([]);
  const url = "http://localhost:4000";
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/api/user/admin/orders`);
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p><strong>Name:</strong> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
            <p><strong>Email:</strong> {order.customerInfo.email}</p>
            <p><strong>Address:</strong> {order.customerInfo.street}, {order.customerInfo.city}, {order.customerInfo.state}, {order.customerInfo.country} - {order.customerInfo.zipCode}</p>
            <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <h4>Items:</h4>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - Size: {item.size} - Qty: {item.quantity} - Price: ${item.price}
                </li>
              ))}
            </ul>

            <div className="total-info">
              <p>Subtotal: ${order.subtotal}</p>
              <p>Delivery Fee: ${order.deliveryFee}</p>
              <p><strong>Total: ${order.totalAmount}</strong></p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Order;
