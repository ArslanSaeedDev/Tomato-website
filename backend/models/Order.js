import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerInfo: {
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
  },
  items: [{
    itemId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  subtotal: Number,
  deliveryFee: Number,
  totalAmount: Number,
  status: { type: String, default: 'Processing' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);