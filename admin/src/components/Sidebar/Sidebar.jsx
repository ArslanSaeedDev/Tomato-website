import React from 'react';
import './Sidebar.css';
import { assets } from './../../assets/assets';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to="add" className="sidebar-option">
          <img src={assets.add_icon} alt="Add Item" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to="list" className="sidebar-option">
          <img src={assets.order_icon} alt="List Items" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="order" className="sidebar-option">
          <img src={assets.order_icon} alt="List Items" />
          <p>Orders</p>
        </NavLink>
       
      </div>
    </div>
  );
}

export default Sidebar;
