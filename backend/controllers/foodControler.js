import FoodModel from "../models/food.js";
import fs from "fs";

//add food item
const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;
  let image_filename = `${req.file.filename}`;

  try {
    // Create a new food product
    const food = new FoodModel({
      name,
      description,
      price,
      image: image_filename,
      category,
    });
    await food.save();
    // Respond with the saved product
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    res.json({ success: false, message: "Error food not added" });
  }
};

// List all food items
const foodList = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Error fetching food list:", error);
    res.json({ success: false, message: "Error fetching food list" });
  }
};

// List romove food items
const removedFood = async (req, res) => {
  try {
    const { id } = req.body;
    const food = await FoodModel.findById(id);
    // Remove the associated image file
    fs.unlink(`uploads/${food.image}`, () => {});
    // Delete the food item from the database
    await FoodModel.findByIdAndDelete(id);
    res.json({ success: true, data: "foodremove" });
  } catch (error) {
    console.log("Error fetching food list:", error);
    res.json({ success: false, message: "Error fetching food remove list" });
  }
};


// Update food item
const updateFood = async (req, res) => {
  const { id, name, description, price, category } = req.body;
  let image_filename = req.file ? req.file.filename : null;

  try {
    const food = await FoodModel.findById(id);
    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // Update fields
    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;
    food.category = category || food.category;

    // If a new image is uploaded, replace the old one
    if (image_filename) {
      fs.unlink(`uploads/${food.image}`, () => {});
      food.image = image_filename;
    }

    await food.save();
    res.json({ success: true, message: "Food updated successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error updating food item" });
  }
};

export { addFood, foodList, removedFood ,updateFood};
