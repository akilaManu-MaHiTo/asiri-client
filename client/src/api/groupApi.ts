import axios from "axios";
import { date, z } from "zod";

export const groupSchema = z.object({
  _id: z.string(),
  name: z.string()
});

export type Group = z.infer<typeof groupSchema>;

export async function createGroup(group: Group) {
  const res = await axios.post("/api/group", group);
  return res.data;
}

export async function getGrouplist() {
  const res = await axios.get(`/api/group`);
  return res.data;
}