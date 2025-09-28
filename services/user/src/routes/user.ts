import express from "express";
import {
  getAllUsers,
  login,
  myProfile,
  updateProfile,
  updateProfilePic,
} from "../controllers/user";
import { isAuth } from "../middlewares/auth";
import upload from "../middlewares/multer";

const router = express.Router();

router.post("/login", login);
router.get("/user/:id", getAllUsers);
router.get("/me", isAuth, myProfile);
router.patch("/update", isAuth, updateProfile);
router.patch("/updatepic", isAuth, upload.single("image"), updateProfilePic);

export default router;
