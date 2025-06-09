import React from "react";
import { Link } from "react-router-dom"
import finSimcoLogo from '../assets/finsimco.svg';
export default function MainPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white text-center px-6 py-10 space-y-8">
      <img src={finSimcoLogo} alt="Finsimco Logo" className="w-40 h-auto" />

      <h1 className="text-4xl font-bold text-finsimco-orange">Welcome to Finsimco Simulator</h1>
      <h2 className="text-lg text-finsimco-light">A simple yet engaging two-team financial strategy game</h2>

      <div className="max-w-3xl text-left text-white bg-gray-800 p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">About the Simulation</h3>
        <p className="mb-2">
          This is a two-team financial simulation where <strong>Team 1</strong> sets values for key business metrics (like EBITDA,
          Interest Rate, etc.), and <strong>Team 2</strong> can only view them and toggle readiness via “TBD”/“OK” buttons.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Team 1 enters six terms such as EBITDA, Interest Rate, Multiple, and so on.</li>
          <li>Team 2 sees the input and can confirm readiness by toggling fields from TBD to OK.</li>
          <li>The valuation and pie chart update dynamically based on entered numbers.</li>
          <li>Left menu buttons open modals with a video and short instructional text.</li>
          <li>The timer simply counts forward, simulating a round timer.</li>
          <li>“First Time Guidance” appears once as a collapsible accordion.</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/team/team1"
          className="bg-finsimco-orange px-6 py-3 rounded text-white font-semibold transition"
        >
          Enter as Team 1
        </Link>
        <Link
          to="/team/team2"
          className="bg-finsimco-orange px-6 py-3 rounded text-white font-semibold transition"
        >
          Enter as Team 2
        </Link>
      </div>
    </div>
  );
}