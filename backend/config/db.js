import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(
      `mongodb+srv://guroarslan:2122444@cluster0.d9gvh.mongodb.net/food-del`
    )
    .then(() => {
        console.log("Connect Db")
    });
};
