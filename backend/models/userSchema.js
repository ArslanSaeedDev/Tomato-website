import mongoose, { Types } from "mongoose";

const userSchemah = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  {
    minimize: false,
  }
);

const userModel = mongoose.models.user||mongoose.model("user",userSchemah);
export default userModel;