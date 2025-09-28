import cloudinary from "cloudinary";
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

export const myProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, bio } = req.body;
    const id = req.user._id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (name !== undefined) user.name = name;
    if (bio !== undefined) user.bio = bio;

    const updated = await user.save();

    return res.status(200).json({ message: "updated profile", updated });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProfilePic = async (req: Request, res: Response) => {
  try {
    console.log(req.file);
    console.log(req.user);

    if (!req.file) {
      return res.status(400).json({ message: "no file given" });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    const user = await User.findByIdAndUpdate(req.user._id, {
      image: result.secure_url,
    });

    return res.status(200).json({ message: "uploaded", user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
