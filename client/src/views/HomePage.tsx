import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../theme";
import PageTitle from "../components/PageTitle";
import Breadcrumb from "../components/BreadCrumb";
import { Controller, useForm } from "react-hook-form";
import useIsMobile from "../customHooks/useIsMobile";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardCard from "../components/DashboardCard";
import { use, useMemo, useState } from "react";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import { useQuery } from "@tanstack/react-query";
import { getPacketTotal } from "../api/salesApi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DatePickerComponent from "../components/DatePickerComponent";
import { dateFormatter } from "../util/dateFormat.util";
import {
  getPacketMonthlySummery,
  getPacketSectionSummery,
  yearData,
} from "../api/packetDashboard";
import ApexBarChart from "../components/ApexBarChart";
import AirlineStopsOutlinedIcon from "@mui/icons-material/AirlineStopsOutlined";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import Looks3OutlinedIcon from "@mui/icons-material/Looks3Outlined";
import Looks4OutlinedIcon from "@mui/icons-material/Looks4Outlined";
import Looks5OutlinedIcon from "@mui/icons-material/Looks5Outlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CustomPieChart from "../components/CustomPieChart";
import CustomButton from "../components/CustomButton";
import { getGrouplist } from "../api/groupApi";
import SectionApexStackedBarDisplay from "../components/SectionApexStackedBarDisplay";
const breadcrumbItems = [
  { title: "Home", href: "/home" },
  { title: "Sales Management" },
];

function SalesDashboard() {
  const { isMobile, isTablet } = useIsMobile();
  const {
    register,
    watch,
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let beforeFormatDate = watch("date") || new Date();
  beforeFormatDate = new Date(beforeFormatDate);
  const formattedDate = dateFormatter(beforeFormatDate);
  const formattedYear = beforeFormatDate.getFullYear();

  const { data: monthlyPacketData, isFetching: isMonthlyPacketDataFetching } =
    useQuery({
      queryKey: ["monthly-packet-summary", formattedYear],
      queryFn: () => getPacketMonthlySummery(formattedYear),
    });
  const { data: packetTotalData } = useQuery({
    queryKey: ["packet-total"],
    queryFn: getPacketTotal,
  });
  const selectedGroupNo = watch("group");
  const selectedYear = watch("year") || formattedYear;
  const {
    data: sectionWiseTotal,
    refetch: refetchSectionWiseTotal,
    isLoading: isSectionWiseTotalLoading,
  } = useQuery({
    queryKey: ["packet-section-total", selectedGroupNo, selectedYear],
    queryFn: () => getPacketSectionSummery(selectedGroupNo, selectedYear),
  });

  const { data: groupListData } = useQuery({
    queryKey: ["group"],
    queryFn: getGrouplist,
  });
  const allTotal = useMemo(() => {
    if (!packetTotalData) return null;
    return {
      totalPackets: packetTotalData.totalPackets,
      returnPackets: packetTotalData.returnPackets,
      totalPrice: packetTotalData.totalPrice,
      totalReturnPrice: packetTotalData.totalReturnPrice,

      section01Total: packetTotalData.section01Total,
      section02Total: packetTotalData.section02Total,
      section03Total: packetTotalData.section03Total,
      section04Total: packetTotalData.section04Total,
      section05Total: packetTotalData.section05Total,

      section01Price: packetTotalData.section01PriceTotal,
      section02Price: packetTotalData.section02PriceTotal,
      section03Price: packetTotalData.section03PriceTotal,
      section04Price: packetTotalData.section04PriceTotal,
      section05Price: packetTotalData.section05PriceTotal,

      subTotal: packetTotalData.subTotal,
    };
  }, [packetTotalData]);

  const chartData = useMemo(() => {
    if (!packetTotalData) return [];

    return [
      { name: "Total Packets", value: packetTotalData.totalPackets },
      { name: "Return Packets", value: packetTotalData.returnPackets },

      { name: "Section 01 Packets", value: packetTotalData.section01Total },
      { name: "Section 02 Packets", value: packetTotalData.section02Total },
      { name: "Section 03 Packets", value: packetTotalData.section03Total },
      { name: "Section 04 Packets", value: packetTotalData.section04Total },
      { name: "Section 05 Packets", value: packetTotalData.section05Total },
    ];
  }, [packetTotalData]);

  const monthlyData = useMemo(() => {
    if (!monthlyPacketData) return Array(12).fill(0);

    return [
      monthlyPacketData.jan.totalPackets,
      monthlyPacketData.feb.totalPackets,
      monthlyPacketData.mar.totalPackets,
      monthlyPacketData.apr.totalPackets,
      monthlyPacketData.may.totalPackets,
      monthlyPacketData.jun.totalPackets,
      monthlyPacketData.jul.totalPackets,
      monthlyPacketData.aug.totalPackets,
      monthlyPacketData.sep.totalPackets,
      monthlyPacketData.oct.totalPackets,
      monthlyPacketData.nov.totalPackets,
      monthlyPacketData.dec.totalPackets,
    ];
  }, [monthlyPacketData]);
  const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const sectionColors = [
    "#1F77B4", // blue
    "#FF7F0E", // orange
    "#2CA02C", // green
    "#D62728", // red
    "#9467BD", // purple
  ];

  const chartDataSectionWise = useMemo(() => {
    const months = sectionWiseTotal?.monthly || [];

    return months.map((m) => ({
      month: MONTH_NAMES[(m.month || 1) - 1] || String(m.month),
      section01: m?.section01 || 0,
      section02: m?.section02 || 0,
      section03: m?.section03 || 0,
      section04: m?.section04 || 0,
      section05: m?.section05 || 0,
    }));
  }, [sectionWiseTotal]);
  type BarSeries = {
    name: string;
    data: number[];
  }[];
  type Payload = {
    series: BarSeries;
    categories: string[];
  };
  const payload = useMemo(() => {
    if (!chartDataSectionWise || chartDataSectionWise.length === 0) {
      return { series: [], categories: [] } as Payload;
    }
    const categories = chartDataSectionWise.map((r) => r.month);
    const first = chartDataSectionWise[0];
    const sectionKeys = Object.keys(first).filter((k) => k !== "month");
    const series = sectionKeys.map((key) => ({
      name: key,
      data: chartDataSectionWise.map((r) => Number(r[key] ?? 0)),
    }));

    return { series, categories };
  }, [chartDataSectionWise]);

  const labelGroupNo = useMemo(() => {
    if (!sectionWiseTotal?.groupNo) return "0";
    return sectionWiseTotal?.groupNo;
  }, [sectionWiseTotal]);
  const labelYear = useMemo(() => {
    if (!sectionWiseTotal?.year) return "0";
    return sectionWiseTotal?.year;
  }, [sectionWiseTotal]);

  const handleFetch = () => {
    refetchSectionWiseTotal();
  };

  return (
    <Stack>
      <Box
        sx={{
          padding: theme.spacing(2),
          boxShadow: 2,
          marginY: 2,
          borderRadius: 1,
          overflowX: "hidden",
        }}
      >
        <PageTitle title="Sales Management Dashboard" />
        <Breadcrumb breadcrumbs={breadcrumbItems} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "1rem",
          flexDirection: isMobile || isTablet ? "column" : "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            minWidth: "150px",
            margin: "0.5rem",
          }}
        >
          <DashboardCard
            title="All Total Packets"
            titleIcon={<ExtensionOutlinedIcon fontSize="small" />}
            value={allTotal?.totalPackets || 0}
            subDescription=""
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            margin: "0.5rem",
            minWidth: "150px",
          }}
        >
          <DashboardCard
            title="All Total Return Packets"
            titleIcon={<AirlineStopsOutlinedIcon fontSize="small" />}
            value={allTotal?.returnPackets || 0}
            subDescription=""
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            margin: "0.5rem",
            minWidth: "150px",
          }}
        >
          <DashboardCard
            title="Section 01 Total Packets"
            titleIcon={<LooksOneOutlinedIcon fontSize="small" />}
            value={allTotal?.section01Total || 0}
            subDescription=""
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "1rem",
          flexDirection: isMobile || isTablet ? "column" : "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            margin: "0.5rem",
            minWidth: "150px",
          }}
        >
          <DashboardCard
            title="Section 02 Total Packets"
            titleIcon={<LooksTwoOutlinedIcon fontSize="small" />}
            value={allTotal?.section02Total || 0}
            subDescription=""
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            margin: "0.5rem",
            minWidth: "150px",
          }}
        >
          <DashboardCard
            title="Section 03 Total Packets"
            titleIcon={<Looks3OutlinedIcon fontSize="small" />}
            value={allTotal?.section03Total || 0}
            subDescription=""
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            margin: "0.5rem",
            minWidth: "150px",
          }}
        >
          <DashboardCard
            title="Section 04 Total Packets"
            titleIcon={<Looks4OutlinedIcon fontSize="small" />}
            value={allTotal?.section04Total || 0}
            subDescription=""
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "1rem",
          flexDirection: isMobile || isTablet ? "column" : "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            margin: "0.5rem",
            minWidth: "150px",
          }}
        >
          <DashboardCard
            title="Section 05 Total Packets"
            titleIcon={<Looks5OutlinedIcon fontSize="small" />}
            value={allTotal?.section05Total || 0}
            subDescription=""
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            margin: "0.5rem",
            minWidth: "150px",
          }}
        >
          <DashboardCard
            title="All Total Amount"
            titleIcon={<AttachMoneyOutlinedIcon fontSize="small" />}
            value={"Rs." + allTotal?.subTotal || 0}
            subDescription=""
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            margin: "0.5rem",
            minWidth: "150px",
          }}
        >
          <DashboardCard
            title="All Return Amount"
            titleIcon={<KeyboardReturnOutlinedIcon fontSize="small" />}
            value={"Rs." + allTotal?.totalReturnPrice || 0}
            subDescription=""
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "auto",
            marginTop: "1rem",
            flex: 2,
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            padding: "1rem",
            borderRadius: "0.3rem",
            border: "1px solid var(--primary-light)",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
              }}
            >
              {labelGroupNo} Section Summary For {labelYear}
            </Typography>
          </Box>
          <Box sx={{ margin: "1.5rem" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{
                  borderBottom: "1px solid var(--pallet-lighter-grey)",
                }}
              >
                <Typography variant="subtitle2">Filter</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "0,5rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      minWidth: "250px",
                    }}
                  >
                    <Autocomplete
                      {...register("group", { required: false })}
                      size="small"
                      options={groupListData?.map((group) => group.name)}
                      sx={{ flex: 1, margin: "0.5rem" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          error={!!errors.group}
                          label="Group No"
                          name="group"
                        />
                      )}
                    />

                    <Autocomplete
                      {...register("year", { required: false })}
                      size="small"
                      options={
                        yearData?.length
                          ? yearData.map((year) => year.year)
                          : []
                      }
                      sx={{ flex: 1, margin: "0.5rem" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          error={!!errors.group}
                          label="Select Year"
                          name="year"
                        />
                      )}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "0.5rem",
                    marginX: "0.5rem",
                  }}
                >
                  <Button
                    onClick={() => {
                      reset();
                      console.log("reset");
                    }}
                    sx={{ color: "var(--button-color)", marginRight: "0.5rem" }}
                  >
                    Reset
                  </Button>
                  <CustomButton
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--button-color)",
                    }}
                    size="medium"
                    onClick={handleSubmit((data) => {
                      handleFetch();
                      console.log("data", data);
                    })}
                  >
                    Add Filter
                  </CustomButton>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
          <ResponsiveContainer width="100%" height={500}>
            <Box>
              <SectionApexStackedBarDisplay
                payload={payload}
                colors={sectionColors}
              />
            </Box>
          </ResponsiveContainer>
        </Box>

        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flex: 1,
            flexDirection: "column",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "0.3rem",
            border: "1px solid var(--primary-light)",
            padding: "1rem",
            height: "auto",
            marginTop: "1rem",
          }}
        >
          <ResponsiveContainer width="100%" height={500}>
            <Box display="flex" justifyContent="center">
              <CustomPieChart data={chartData} title="Packet Summary" />
            </Box>
          </ResponsiveContainer>
        </Box> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "auto",
            marginTop: "1rem",
            flex: 2,
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            padding: "1rem",
            borderRadius: "0.3rem",
            border: "1px solid var(--primary-light)",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
              }}
            >
              {formattedYear} Monthly Packet Summary
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={500}>
            <Box>
              <ApexBarChart
                title="Monthly Packet Summary"
                seriesName="Total Packets"
                data={monthlyData}
              />
            </Box>
          </ResponsiveContainer>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flex: 1,
            flexDirection: "column",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "0.3rem",
            border: "1px solid var(--primary-light)",
            padding: "1rem",
            height: "auto",
            marginTop: "1rem",
          }}
        >
          <ResponsiveContainer width="100%" height={500}>
            <Box display="flex" justifyContent="center">
              <CustomPieChart data={chartData} title="Packet Summary" />
            </Box>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Stack>
  );
}

export default SalesDashboard;
