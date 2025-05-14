import   express  from 'express';
import { loginUser,registerUser  ,placeOrder, getAllOrders } from '../controllers/userControler.js';

const userRouter = express.Router()


userRouter.post("/login",loginUser)
userRouter.post("/register",registerUser)
userRouter.post("/order",placeOrder)
userRouter.get('/admin/orders', getAllOrders);


export default userRouter;