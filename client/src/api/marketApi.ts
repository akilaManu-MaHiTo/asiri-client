import axios from "axios";
import { date, z } from "zod";

export const marketSchema = z.object({
  _id: z.string(),
  name: z.string()
});

export type Market = z.infer<typeof marketSchema>;

export async function createMarket(market: Market) {
  const res = await axios.post("/api/market", market);
  return res.data;
}

export async function getMarketlist() {
  const res = await axios.get(`/api/market`);
  return res.data;
}