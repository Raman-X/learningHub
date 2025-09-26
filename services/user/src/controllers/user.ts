import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, name, image } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      await User.create({ email, name, image });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: "5d",
    });

    res.status(200).json({ message: "logged in successfully", token, user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
