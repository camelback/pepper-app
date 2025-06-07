import React, { useState } from "react";

export default function CardGameStatsTabs({
  playerScores = [],
  discardHistory = [],
  miscLogs = [],
}) {
  const [tab, setTab] = useState("scores");

  return (
    <div className="fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl rounded-r-2xl flex flex-col z-40">
      {/* Tabs header */}
      <div className="flex border-b bg-gray-100 rounded-tr-2xl">
        <button
          className={`flex-1 px-4 py-2 text-sm font-semibold ${
            tab === "scores" ? "bg-white border-b-2 border-blue-600" : ""
          }`}
          onClick={() => setTab("scores")}
        >
          Player Scores
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm font-semibold ${
            tab === "discard" ? "bg-white border-b-2 border-blue-600" : ""
          }`}
          onClick={() => setTab("discard")}
        >
          4 Card Discard
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm font-semibold ${
            tab === "misc" ? "bg-white border-b-2 border-blue-600" : ""
          }`}
          onClick={() => setTab("misc")}
        >
          Misc
        </button>
      </div>

      {/* Tab content (scrollable if long) */}
      <div className="p-4 flex-1 overflow-y-auto min-h-0">
        {tab === "scores" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Player Scores</h3>
            {playerScores.length === 0 ? (
              <div className="text-gray-500">No scores yet.</div>
            ) : (
              <ul>
                {playerScores.map((p, i) => (
                  <li key={i} className="mb-1 flex justify-between">
                    <span className="font-medium">{p.name}</span>
                    <span className="font-mono">{p.score}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === "discard" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">4 Card Discard History</h3>
            {discardHistory.length === 0 ? (
              <div className="text-gray-500">No discards yet.</div>
            ) : (
              <ul className="space-y-2">
                {discardHistory.map((entry, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="font-medium">{entry.player}</span>
                    <span>discarded</span>
                    <span className="font-mono">
                      {entry.cards.join(", ")}
                    </span>
                    <span className="ml-auto text-xs text-gray-400">
                      {entry.time && new Date(entry.time).toLocaleTimeString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === "misc" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Miscellaneous</h3>
            {miscLogs.length === 0 ? (
              <div className="text-gray-500">No misc events.</div>
            ) : (
              <ul className="space-y-2">
                {miscLogs.map((log, i) => (
                  <li key={i} className="text-sm flex items-center gap-2">
                    <span>{log.message}</span>
                    {log.timestamp && (
                      <span className="ml-auto text-xs text-gray-400">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
