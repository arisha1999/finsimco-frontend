import React, { useState } from "react";
import { useStore } from "../store/team_store";

export default function Sidebar() {
  const gifUrl = useStore((s) => s.gifUrl);
  const longText = useStore((s) => s.longText);
  const [modal, setModal] = useState<"video" | "text" | null>(null);

  return (
    <>
      <aside className="w-24 bg-background text-white flex flex-col items-center py-4 space-y-4">
        <button
          onClick={() => setModal("video")}
          className="w-16 h-16 rounded flex items-center justify-center hover:bg-finsimco-orange"
          title="Show Video"
        >
          ▶️
        </button>
        <button
          onClick={() => setModal("text")}
          className="w-16 h-16 rounded flex items-center justify-center hover:bg-finsimco-orange"
          title="Show Text"
        >
          📝
        </button>
      </aside>

      {modal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4"
          onClick={() => setModal(null)}
        >
          <div
            className="relative bg-white rounded-lg p-6 w-auto max-w-5xl max-h-[90vh] overflow-auto min-w-[320px]"
            onClick={(e) => e.stopPropagation()}
          >
            {modal === "video" && (
              <video
                src={gifUrl}
                controls
                className="w-full min-w-[320px] min-h-[200px] rounded mb-4"
              />
            )}

            {modal === "text" && (
              <p className="text-gray-700 whitespace-pre-wrap mb-6">{longText}</p>
            )}

            <div className="flex justify-end">
              <button
                className="bg-finsimco-grey text-finsimco-orange rounded px-4 py-2 hover:bg-gray-200"
                onClick={() => setModal(null)}
              >
                Close ✖
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}