import { Box, Typography } from "@mui/material";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import useIsMobile from "../customHooks/useIsMobile";

type PieChartData = {
  name: string;
  value: number;
};

type CustomPieChartProps = {
  data: PieChartData[];
  colors?: string[];
  width?: number | string;
  height?: number | string;
  title?: string;
  centerLabel?: string;
  innerRadius?: number;
  outerRadius?: number;
};

// Custom tooltip to display just the value without a dash
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "8px 12px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          textAlign: "center",
          fontSize: "14px",
          marginTop: "10px",
        }}
      >
        <strong>{payload[0].name}</strong>
        <div>Value: {payload[0].value.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};


const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  colors = [
    "#0D47A1", // Dark Blue
    "#16C47F", // Green
    "#FF7043", // Orange
    "#AB47BC", // Purple
    "#29B6F6", // Light Blue
    "#EF5350", // Red
    "#FFCA28", // Amber
    "#66BB6A", // Light Green
    "#5C6BC0", // Indigo
    "#FFA726", // Orange Accent
    "#26C6DA", // Cyan
    "#8D6E63", // Brown
  ],
  width,
  height = 400,
  title,
  centerLabel,
  innerRadius = 90,
  outerRadius = 120,
}) => {
  const { isMobile, isTablet } = useIsMobile();
  const chartWidth = width ?? (isMobile ? 300 : isTablet ? 300 : 350);
  return (
    
    <Box display="flex" flexDirection="column" alignItems="center">
      {title && (
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
      )}
      <div style={{ width: chartWidth, height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={1}
              cornerRadius={5}
              cx="50%"
              cy="50%"
              dataKey="value"
              label={false}
            >
              {centerLabel && (
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#333"
                  fontSize={16}
                  fontWeight="bold"
                >
                  {centerLabel}
                </text>
              )}
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default CustomPieChart;
