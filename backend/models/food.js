import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,  // URL of the image
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const FoodModel = mongoose.models.food || mongoose.model('Food', foodSchema);

export default FoodModel;
