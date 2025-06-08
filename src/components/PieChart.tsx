// components/PieChart.tsx
import React from "react";

interface Props {
  valuation: number;
}

export default function PieChart({ valuation }: Props) {
  // Для упрощения — рисуем 3 сектора пропорционально EBITDA, Multiple и Factor Score
  // Можно заменить на библиотеку (recharts/d3), но здесь простая SVG демонстрация

  const ebitdaPortion = 40;
  const multiplePortion = 35;
  const factorPortion = 25;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  const strokeEbitda = (circumference * ebitdaPortion) / 100;
  const strokeMultiple = (circumference * multiplePortion) / 100;
  const strokeFactor = (circumference * factorPortion) / 100;

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center">
      <h2 className="font-bold mb-2">Pie Chart (Mocked)</h2>
      <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        <circle
          r={radius}
          cx={radius}
          cy={radius}
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth={20}
        />
        {/* EBITDA slice */}
        <circle
          r={radius}
          cx={radius}
          cy={radius}
          fill="transparent"
          stroke="#3b82f6"
          strokeWidth={20}
          strokeDasharray={`${strokeEbitda} ${circumference - strokeEbitda}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        {/* Multiple slice */}
        <circle
          r={radius}
          cx={radius}
          cy={radius}
          fill="transparent"
          stroke="#10b981"
          strokeWidth={20}
          strokeDasharray={`${strokeMultiple} ${circumference - strokeMultiple}`}
          strokeDashoffset={-strokeEbitda}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        {/* Factor Score slice */}
        <circle
          r={radius}
          cx={radius}
          cy={radius}
          fill="transparent"
          stroke="#f59e0b"
          strokeWidth={20}
          strokeDasharray={`${strokeFactor} ${circumference - strokeFactor}`}
          strokeDashoffset={-(strokeEbitda + strokeMultiple)}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>
    </div>
  );
}