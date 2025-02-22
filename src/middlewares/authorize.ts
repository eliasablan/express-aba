import type { Request, Response, NextFunction } from "express";
import type { IProject } from "../data/projectData";
import type { IUser } from "../util/generateToken";

type PolicyHandler = (user: IUser, resource: IProject) => boolean;

export const authorize =
  (policy: PolicyHandler, resource: IProject) =>
  (req: Request & { user: IUser }, res: Response, next: NextFunction) => {
    const user = req.user;
    if (policy(user, resource)) {
      return next();
    } else {
      return res.status(403).json({ status: 403, message: "Access denied" });
    }
  };
