// components/Sidebar.tsx
import React, { useState } from "react";

const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

const longText =
  "This is a 500 character example text. ".repeat(20).slice(0, 500);

export default function Sidebar() {
  const [modal, setModal] = useState<"video" | "text" | null>(null);

  return (
    <>
      <aside className="w-24 bg-gray-800 text-white flex flex-col items-center py-4 space-y-4">
        <button
          onClick={() => setModal("video")}
          className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600"
          title="Show Video"
        >
          ▶️
        </button>
        <button
          onClick={() => setModal("text")}
          className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600"
          title="Show Text"
        >
          📝
        </button>
      </aside>

      {modal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded p-6 max-w-3xl max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mb-4 text-red-500 font-bold"
              onClick={() => setModal(null)}
            >
              Close ✖
            </button>
            {modal === "video" && (
              <video src={videoUrl} controls className="w-full rounded" />
            )}
            {modal === "text" && (
              <p className="text-gray-700 whitespace-pre-wrap">{longText}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}