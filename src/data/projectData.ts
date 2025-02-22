import type { IUser } from "../util/generateToken";

export interface IProject {
  id: number;
  name: string;
  department: string;
  accessLevel: number;
  team: IUser["id"][];
}

export const projects: IProject[] = [
  {
    id: 1,
    name: "IT Project",
    department: "IT",
    accessLevel: 2,
    team: [3, 4],
  },
  {
    id: 2,
    name: "HR Project",
    department: "HR",
    accessLevel: 1,
    team: [1, 2],
  },
];
