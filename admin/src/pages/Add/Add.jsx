import React, { useState } from "react";
import "./Add.css";
import { assets } from "./../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Add() {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="product-form-container">
      <form className="product-form" onSubmit={onSubmitHandler}>
        <div className="img-upload">
          <p className="img-p">Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload area"
              className="image-preview"
            />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            name="image"
            accept="image/*"
            hidden
          />
        </div>

        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={onChangeHandler}
          value={data.name}
        />

        <label htmlFor="description">Product Description</label>
        <textarea
          id="description"
          name="description"
          rows="6"
          required
          onChange={onChangeHandler}
          value={data.description}
        />

        <div className="category-price-container">
          <div className="pro-cat">
            <label htmlFor="category">Product Category</label>
            <select
              id="category"
              name="category"
              required
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="">Select Category</option>
              <option value="Rolls">Rolls</option>
              <option value="Salad">Salad</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Nodle">Nodle</option>
            </select>
          </div>

          <div className="pro-cat">
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              id="price"
              name="price"
              required
              onChange={onChangeHandler}
              value={data.price}
            />
          </div>
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Add;
