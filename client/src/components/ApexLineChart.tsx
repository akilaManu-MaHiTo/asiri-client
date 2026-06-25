import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ApexLineChartProps {
  title?: string;
  categories: string[];
  seriesName: string;
  data: number[];
  height?: number;
  strokeColor?: string;
}

const ApexLineChart: React.FC<ApexLineChartProps> = ({
  title = "",
  categories,
  seriesName,
  data,
  height = 470,
  strokeColor = "#d32f2f",
}) => {
  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        height,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 1,
      },
      colors: [strokeColor],
      markers: {
        size: 4,
      },
      dataLabels: {
        enabled: true,
      },
      grid: {
        borderColor: "#e7e7e7",
        strokeDashArray: 4,
      },
      xaxis: {
        categories,
        labels: {
          rotate: -45,
        },
      },
      yaxis: {
        labels: {
          formatter: (value) => Math.round(value).toString(),
        },
      },
      tooltip: {
        y: {
          formatter: (value) => value.toLocaleString(),
        },
      },
      title: {
        text: title,
        align: "center",
        style: { color: "#444" },
      },
    }),
    [categories, height, strokeColor, title]
  );

  const chartSeries = useMemo(
    () => [
      {
        name: seriesName,
        data,
      },
    ],
    [data, seriesName]
  );

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={height}
    />
  );
};

export default ApexLineChart;