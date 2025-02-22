import express, { type RequestHandler } from "express";
import { verifyToken } from "../middlewares/authentication";
import { updateProject, viewProject } from "../controllers/projectController";

const router = express.Router();

// Route to view a project
router.get("/:id", verifyToken as RequestHandler, viewProject);

// Route to update a project
router.post("/:id", verifyToken as RequestHandler, updateProject);

export default router;
