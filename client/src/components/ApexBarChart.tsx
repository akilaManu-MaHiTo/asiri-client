import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ApexBarChartProps {
  title?: string;
  categories?: string[];
  seriesName: string;
  data: number[];
  height?: number;
  dataLabelFormatter?: (val: number) => string;
  barColor?: string;
}

const ApexBarChart: React.FC<ApexBarChartProps> = ({
  title = "",
  categories = [
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
  ],
  seriesName,
  data,
  height = 470,
  dataLabelFormatter = (val) => val.toString(),
  barColor = "#d32f2f",
}) => {
  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        height,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top",
          },
          colors: {
            ranges: [
              {
                from: 0,
                to: Number.MAX_VALUE,
                color: barColor,
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: dataLabelFormatter,
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories,
        position: "top",
        axisBorder: { show: false },
        axisTicks: { show: false },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: { enabled: true },
      },
      yaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          formatter: dataLabelFormatter,
        },
      },
      title: {
        text: title,
        floating: true,
        offsetY: height - 20,
        align: "center",
        style: { color: "#444" },
      },
    }),
    [categories, title, height, dataLabelFormatter]
  );

  const chartSeries = useMemo(
    () => [
      {
        name: seriesName,
        data,
      },
    ],
    [seriesName, data]
  );

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height={height}
    />
  );
};

export default ApexBarChart;
