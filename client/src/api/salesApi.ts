import axios from "axios";
import { date, z } from "zod";

export const salesSchema = z.object({
  id: z.string(),
  groupNo: z.number(),
  date: z.date(),
  unitPrice: z.number(),
  marketName: z.string(),
  noOfPackets: z.number(),
  salesPrice: z.number(),
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

export const updateAccident = async (accident: Sales) => {
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
              item[nestedKey].toString()
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
  const res = await axios.post(
    `/api/accidents/${accident.id}/update`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const deleteAccident = async (id: string) => {
  const res = await axios.delete(`/api/accidents/${id}/delete`);
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
