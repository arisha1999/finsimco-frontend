import React from "react";
import { PieChart as RechartsPieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

interface Props {
  valuation: number;
  interestRate: number;
}

export default function PieChart({ valuation, interestRate }: Props) {
  const data = [
    { name: "Valuation", value: typeof interestRate === "number" ? interestRate : parseInt(interestRate) },
    { name: "Other", value: typeof interestRate === "number" ? 100 - interestRate : 100 - parseInt(interestRate) },
  ];

  const COLORS = ["#3b82f6", "#10b981"];

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col h-full">
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800 drop-shadow-sm">
        Valuation: <span className="text-finsim-dark">{valuation}</span>
      </h2>

      <div className="flex-1 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              labelLine={false}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} cornerRadius={5} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={36} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}