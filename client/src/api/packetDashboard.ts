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

export const MonthData = [
  { month: "January", value: "1" },
  { month: "February", value: "2" },
  { month: "March", value: "3" },
  { month: "April", value: "4" },
  { month: "May", value: "5" },
  { month: "June", value: "6" },
  { month: "July", value: "7" },
  { month: "August", value: "8" },
  { month: "September", value: "9" },
  { month: "October", value: "10" },
  { month: "November", value: "11" },
  { month: "December", value: "12" },
];