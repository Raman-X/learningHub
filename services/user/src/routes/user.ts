import express, { Request, Response } from "express";
import { login } from "../controllers/user";
import { isAuth } from "../middlewares/auth";

const router = express.Router();

router.post("/login", login);
router.get("/me", isAuth, (req: Request, res: Response) => {
  console.log(req.user); // Now TypeScript knows req.user exists here
  res.send("hello world");
});

export default router;
