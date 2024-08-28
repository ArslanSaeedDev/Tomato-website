import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css";
import { Link } from "react-router-dom";
function List() {
  const [list, setList] = useState([]);
  const url = "http://localhost:4000";

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
        toast.success("fetching food list Successfully");
      } else {
        toast.error("Error fetching food list");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeList = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Food item removed successfully");
        fetchList();
      } else {
        toast.error("Error removing food item");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="list-add product-form-container">
      <p className="list-pargraph">All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p className="cursor" onClick={() => removeList(item._id)}>
              X
            </p>
           
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
