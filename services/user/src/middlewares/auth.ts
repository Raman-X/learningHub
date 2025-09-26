// auth.ts
import { NextFunction, Request, Response } from "express"; // Import Request from express
import jwt, { JwtPayload } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer")) {
      res.status(401).json({ message: "user not authenticated 1" });
      return;
    }

    const token = header.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "user not authenticated 2" });
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decoded || !decoded.user) {
      res.status(401).json({ message: "user not authenticated 3" });
      return;
    }

    req.user = decoded.user;
    next();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
};
