import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  let authHeader = (req.headers.authorization ||
    req.headers.Authorization) as string;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "No token provided, authorization denied.",
      });
    }

    try {
      const decode = jwt.verify(token, Bun.env.JWT_SECRET!);
      // @ts-expect-error
      req.user = decode;
      next();
    } catch (err) {
      console.error(err);
      res.status(400).json({ status: 400, message: "Token is not valid" });
    }
  } else {
    return res.status(401).json({
      status: 401,
      message: "No token provided, authorization denied.",
    });
  }
};
