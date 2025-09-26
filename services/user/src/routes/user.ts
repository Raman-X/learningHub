import express from "express";
import {
  getAllUsers,
  login,
  myProfile,
  updateProfile,
} from "../controllers/user";
import { isAuth } from "../middlewares/auth";

const router = express.Router();

router.post("/login", login);
router.get("/user/:id", getAllUsers);
router.get("/me", isAuth, myProfile);
router.patch("/update", isAuth, updateProfile);

export default router;
