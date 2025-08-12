import axios from "axios";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  mobile: z.string(),
  emailVerifiedAt: z.string().nullable(),
  role: z.string(),
  roleId: z.string(),
  profileImage: z.string().nullable(),
  status: z.string(),
  isCompanyEmployee: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  department: z.string(),
  assignedFactory: z.array(z.string()),
  employeeNumber: z.string(),
  jobPosition: z.string(),
});

export type User = z.infer<typeof userSchema>;

export async function validateUser() {
  const res = await axios.get("/api/user");
  return res.data;
}

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const res = await axios.post("/api/auth/login", {
    username,
    password,
  });
  return res.data;
}