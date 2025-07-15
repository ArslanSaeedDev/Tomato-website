import express from "express";
import {
  addFood,
  foodList,
  removedFood,
  updateFood,
} from "../controllers/foodControler.js";
import multer from "multer";

const foodRouter = express.Router();

// Image storage engine
// const storage = multer.diskStorage({
//   destination: "upload", // Specify the upload directory
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); // Generates a unique filename with a timestamp
//   },
// });

// const upload = multer({ storage: storage });

// Route to add a new food item
// foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.post("/add", addFood);
foodRouter.get("/list", foodList);
foodRouter.post("/remove", removedFood);
// foodRouter.post("/update", upload.single("image"), updateFood);
foodRouter.post("/update", updateFood);

export default foodRouter;
