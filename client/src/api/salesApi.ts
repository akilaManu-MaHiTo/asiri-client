import axios from "axios";
import { date, z } from "zod";

export const salesSchema = z.object({
  _id: z.string(),
  groupNo: z.number(),
  date: z.date(),
  unitPrice: z.number(),
  marketName: z.string(),
  noOfPackets: z.number(),
  salesPrice: z.number(),
  createdAt: z.date(),
  totalPrice: z.number(),
  salesTotalPrice: z.number(),
  noOfReturnPackets: z.number(),
  totalReturnPrice: z.number(),

  section01: z.number(),
  section02: z.number(),
  section03: z.number(),
  section04: z.number(),
  section05: z.number(),

  section01Price: z.number().optional(),
  section02Price: z.number().optional(),
  section03Price: z.number().optional(),
  section04Price: z.number().optional(),
  section05Price: z.number().optional(),

  isSection02Only: z.boolean().optional(),
});

export type Sales = z.infer<typeof salesSchema>;

export async function createPackets(packet: Sales) {
  const res = await axios.post("/api/packet", packet);
  return res.data;
}

export async function getPacketList() {
  const res = await axios.get("/api/packet");
  return res.data;
}

export async function getPacketTotal() {
  const res = await axios.get("/api/packet/total-price");
  return res.data;
}

export async function getDailyPacketTotal(date: String) {
  const res = await axios.get(`/api/packet/daily-total-price/${date}`);
  return res.data;
}

export async function getMonthlyPacketTotal(date: String) {
  const res = await axios.get(`/api/packet/monthly-total-price/${date}`);
  return res.data;
}

export async function getDailyPacketReport(date: String) {
  const res = await axios.get(`/api/packet/daily-sales/${date}`);
  return res.data;
}

export async function getMonthlyPacketReport(date: String) {
  const res = await axios.get(`/api/packet/monthly-sales/${date}`);
  return res.data;
}

export async function getEachDayPacketSummary(year: String, month: any) {
  const res = await axios.get(`/api/packet/daily-summary-graph/${year}/${month.value}`);
  return res.data;
}

export interface PacketByMarketResponse {
  year: number;
  month: number;
  labels: string[];
  data: number[];
  returnData?: number[];
  summary?: Array<{
    marketName: string;
    totalPackets: number;
    returnPackets: number;
  }>;
}

export async function getPacketByMarket(year: String, month: any) {
  const res = await axios.get(`/api/packet/market-count/${year}/${month.value}`);
  return res.data as PacketByMarketResponse;
}
export async function getAccidentsList() {
  const res = await axios.get("/api/accidents");
  return res.data;
}

export async function getAccidentsAssignedTaskList() {
  const res = await axios.get("/api/accidents-assign-task");
  return res.data;
}

export async function getAccidentsApprovedTaskList() {
  const res = await axios.get("/api/accidents-assign-task-approved");
  return res.data;
}

export const createAccident = async (accident: Sales) => {
  const formData = new FormData();
  Object.keys(accident).forEach((key) => {
    const value = accident[key as keyof typeof accident];

    if (key === "evidence" && Array.isArray(value)) {
      value.forEach((file, index) => {
        formData.append(`evidence[${index}]`, file as File);
      });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (key === "witnesses" || key === "effectedIndividuals") {
          Object.keys(item).forEach((nestedKey) => {
            formData.append(
              `${key}[${index}][${nestedKey}]`,
              item[nestedKey]?.toString()
            );
          });
        } else {
          formData.append(`${key}[${index}]`, JSON.stringify(item));
        }
      });
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
  });

  const res = await axios.post("/api/accidents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updatePacket = async (sale: Sales) => {
  const res = await axios.put(`/api/packet/${sale._id}`, sale);
  return res.data;
};

export const deletePacket = async (id: string) => {
  const res = await axios.delete(`/api/packet/${id}`);
  return res.data;
};

export const MarketNames = [
  {
    id: "1",
    name: "Fresh Vege",
  },
  {
    id: "2",
    name: "Market 1",
  },
];

export const GROUPNO = [
  {
    id: "1",
    name: 22,
  },
  {
    id: "2",
    name: 23,
  },
];
