// components/PieChart.tsx
import React from "react";

interface Props {
  valuation: number
  interestRate: number;
}

export default function PieChart({ valuation, interestRate}: Props) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  const strokeInterestRate = (circumference * interestRate) / 100;
  const other = (circumference * (100 - interestRate)) / 100;

  return (
      <div className="bg-white rounded shadow p-4 flex flex-col h-full">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800 drop-shadow-sm">
          Valuation: <span className="text-finsim-dark">{valuation}</span>
        </h2>
        <div className="flex flex-1 justify-between">
          {/* Diagram */}
          <div className="w-3/5 flex items-center justify-center">
            <svg
                width={radius * 3}
                height={radius * 3}
                viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            >
              <circle
                  r={radius - 10}
                  cx={radius}
                  cy={radius}
                  fill="transparent"
                  stroke="#e5e7eb"
                  strokeWidth={20}
              />
              {/* Interest Rate slice */}
              <circle
                  r={radius - 10}
                  cx={radius}
                  cy={radius}
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth={20}
                  strokeDasharray={`${strokeInterestRate} ${circumference - strokeInterestRate}`}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${radius} ${radius})`}
              />
              {/* Others slice */}
              <circle
                  r={radius - 10}
                  cx={radius}
                  cy={radius}
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth={20}
                  strokeDasharray={`${other} ${circumference - other}`}
                  strokeDashoffset={-strokeInterestRate}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${radius} ${radius})`}
              />
            </svg>
          </div>

          {/* Legend */}
          <div className="w-2/5 flex flex-col justify-center pl-6">
            <div className="flex items-center mb-3">
          <span
              className="inline-block w-5 h-5 rounded-full"
              style={{backgroundColor: "#3b82f6"}}
          />
              <span className="ml-2 text-gray-700 font-medium">Valuation</span>
            </div>
            <div className="flex items-center">
          <span
              className="inline-block w-5 h-5 rounded-full"
              style={{backgroundColor: "#10b981"}}
          />
              <span className="ml-2 text-gray-700 font-medium">Other</span>
            </div>
          </div>
        </div>
      </div>
  );
}