import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

type BarSeries = {
  name: string;
  data: number[];
}[];

type Payload = { series: BarSeries; categories: string[] };

interface Props {
  payload: Payload;
  height?: number;
  colors?: string[];
  showValues?: boolean;
  percent?: boolean;
}

export default function SectionApexStackedBarDisplay({
  payload,
  height = 420,
  colors,
  showValues = false,
  percent = false,
}: Props) {
  const series: BarSeries = payload?.series ?? [];
  const categories: string[] = payload?.categories ?? [];

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        stacked: true,
        stackType: percent ? ("100%" as const) : ("normal" as const),
        toolbar: { show: true },
      },
      plotOptions: {
        bar: { horizontal: false,borderRadius: 10 },
      },
      dataLabels: {
        enabled: !!showValues,
        formatter: (val: number) => Math.round(val).toString(), // MUST return string
      },
      stroke: { show: true, width: 1 },
      xaxis: { categories },
      yaxis: {
        labels: {
          formatter: (val: number) => Math.round(val).toString(),
        },
      },
      legend: { position: "top" },
      tooltip: { shared: true, intersect: false },
      colors: colors,
    }),
    [categories, colors, showValues, percent]
  );

  return (
    <div style={{ width: "100%", height }}>
      <Chart
        options={options}
        series={series as any}
        type="bar"
        height={height}
      />
    </div>
  );
}
