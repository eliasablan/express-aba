import { type IProject } from "../data/projectData";
import type { IUser } from "../util/generateToken";

export const canViewProject = (user: IUser, project: IProject) => {
  return (
    user.role === "admin" ||
    user.department === project.department ||
    (user.accessLevel >= project.accessLevel && project.team.includes(user.id))
  );
};
export const canUpdateProject = (user: IUser, project: IProject) => {
  return (
    user.role === "admin" ||
    (user.role === "manager" && user.department === project.department) ||
    project.team.includes(user.id)
  );
};
