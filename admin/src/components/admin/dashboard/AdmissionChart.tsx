import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { getMonthlyApplications } from "@/services/applicationApi";

interface MonthlyApplication {
  month: string;
  applications: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg border bg-white px-3 py-2 shadow-md">
        <p className="text-xs font-medium text-gray-500">
          {label}
        </p>

        <p className="text-sm font-semibold text-orange-600">
          {payload[0].value} Applications
        </p>
      </div>
    );
  }

  return null;
};

const AdmissionChart: React.FC = () => {
  const [data, setData] = useState<MonthlyApplication[]>([]);

  useEffect(() => {
    fetchChart();
  }, []);

  const fetchChart = async () => {
    try {
      const res = await getMonthlyApplications();
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          Admission Trends
        </CardTitle>

        <p className="text-sm text-slate-500">
          Monthly Admission Report
        </p>
      </CardHeader>

      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 5,
                left: -25,
                bottom: 0,
              }}
            >
              {/* Orange → Yellow Gradient */}
              <defs>
                <linearGradient
                  id="orangeYellowFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#F97316"
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="50%"
                    stopColor="#FB923C"
                    stopOpacity={0.18}
                  />

                  <stop
                    offset="100%"
                    stopColor="#FACC15"
                    stopOpacity={0.03}
                  />
                </linearGradient>
              </defs>

              {/* X Axis */}
              <XAxis
                dataKey="month"
                axisLine={{ stroke: "#9CA3AF" }}
                tickLine={{ stroke: "#9CA3AF" }}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />

              {/* Y Axis */}
              <YAxis
                axisLine={{ stroke: "#9CA3AF" }}
                tickLine={{ stroke: "#9CA3AF" }}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                allowDecimals={false}
              />

              {/* Tooltip */}
              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
              />

              {/* Admission Area */}
              <Area
                type="monotone"
                dataKey="applications"
                stroke="#F97316"
                strokeWidth={2}
                fill="url(#orangeYellowFill)"
                fillOpacity={1}
                dot={{
                  r: 2,
                  fill: "#F97316",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 4,
                  fill: "#F97316",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdmissionChart;