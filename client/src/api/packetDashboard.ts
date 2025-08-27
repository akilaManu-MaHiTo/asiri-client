import axios from "axios";

export async function getPacketMonthlySummery(year: String) {
  const res = await axios.get(`/api/packet/monthly-summary/${year}`);
  return res.data;
}