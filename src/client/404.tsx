import React from "react";
import { Link } from "react-router-dom";
import catLogo from '../assets/oia-uia.gif';
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white text-center px-4">
      <h1 className="text-6xl font-bold text-finsimco-orange mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-finsimco-light mb-6">Page is not Found</h2>

      <div className="mb-6">
        <img
          src={catLogo}
          alt="Oiia Cat"
          className="max-w-xs md:max-w-md rounded-lg shadow-lg"
        />
      </div>

      <p className="text-lg mb-6 text-">
        It looks like you got the wrong door<br />
        But don't worry, you can stay and vibe with the kitty or get back to main page to work
      </p>

      <Link
        to="/"
        className="bg-purple-light hover:bg-[#40916c] text-white font-bold py-2 px-6 rounded transition duration-300"
      >
        Back to main page
      </Link>
    </div>
  );
}