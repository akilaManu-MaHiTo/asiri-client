import axios from "axios";

export async function getPacketMonthlySummery(year: String) {
  const res = await axios.get(`/api/packet/monthly-summary/${year}`);
  return res.data;
}
export async function getPacketSectionSummery(groupNo: String, year: String) {
  if (!groupNo) {
    groupNo = "0";
  }
  const res = await axios.get(
    `/api/packet/section-by-total/${groupNo}/${year}`
  );
  return res.data;
}
const currentYear = new Date().getFullYear();
export const yearData = Array.from({ length: 10 }, (_, i) => ({
  year: (currentYear - i).toString(),
}));