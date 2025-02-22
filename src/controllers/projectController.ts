import type { Request, Response } from "express";
import { projects, type IProject } from "../data/projectData";
import { authorize } from "../middlewares/authorize";
import { canViewProject, canUpdateProject } from "../policies/projectPolicy";
import type { IUser } from "../util/generateToken";

// Standardized response function
const handleResponse = (
  res: Response,
  status: number,
  message: string,
  project: IProject | null = null
) => {
  res.status(status).json({
    status,
    message,
    project,
  });
};

export const viewProject = (req: Request, res: Response) => {
  const projectId = parseInt(req.params.id);
  const project = getProjectById(projectId, res);
  console.log("Project is: ", project);
  authorize(canViewProject, project as IProject)(
    req as Request & { user: IUser },
    res as Response,
    () => {
      handleResponse(res, 200, "Project retrieved successfully", project);
    }
  );
};
export const updateProject = (req: Request, res: Response) => {
  const requestBody = req.body;
  const projectId = parseInt(req.params.id);
  let project = getProjectById(projectId, res);
  console.log("Project is: ", project);
  authorize(canUpdateProject, project as IProject)(
    req as Request & { user: IUser },
    res as Response,
    () => {
      const projectIndex = projects.findIndex((obj) => obj.id === projectId);
      project = { ...projects[projectIndex], ...requestBody };
      handleResponse(res, 200, "Project updated successfully", project);
    }
  );
};

const getProjectById = (id: number, res: Response) => {
  const project = projects.find((project) => project.id === id);
  if (!project) handleResponse(res, 404, "Project not found");
  return project;
};
