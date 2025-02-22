import jwt from "jsonwebtoken";
import { parseArgs } from "util";

export interface IUser {
  id: number;
  name: string;
  role: string;
  department: string;
  accessLevel: number;
}

export const users: IUser[] = [
  {
    id: 1,
    name: "Elias",
    role: "admin",
    department: "IT",
    accessLevel: 4,
  },
  {
    id: 2,
    name: "John",
    role: "manager",
    department: "HR",
    accessLevel: 4,
  },
];

// Add argunment userId to token script
// example: "bun token --userId 2"
const { values } = parseArgs({
  args: Bun.argv,
  options: {
    userId: {
      type: "string",
      default: "1",
    },
  },
  strict: true,
  allowPositionals: true,
});

const userId = parseInt(values.userId);
const user = users.find((user) => user.id === userId);
console.log({ user });

const token = jwt.sign(user!, Bun.env.JWT_SECRET!, { expiresIn: "1h" });
console.log(`JWT token for ${user?.role}: ${token}`);
