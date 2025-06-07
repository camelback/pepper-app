
'use client'
import { useState, useEffect } from "react";

// Example columns: State (game|player|hand), Action (Suit), Q-Value

export default function PepperEngineDashboard({ data }) {
  const [qData, setQData] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("state");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      // Transform the data into rows for the table
        const table = Object.entries(data).map(([key, value]) => {
        // Expecting key like "gameId|playerId|hand|action"
        const [gameId, playerId, hand, action] = key.split("|");
            return {
            state: `${gameId}|${playerId}|${hand}`,
            action,
            qValue: value,
            gameId,
            playerId,
            hand,
            };
      });
      setQData(table);
    } else {
      setQData([]);
    }
  }, [data]);

  // Sorting and filtering
  const filtered = qData
    .filter(
      row =>
        row.state.toLowerCase().includes(filter.toLowerCase()) ||
        row.action.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "qValue") {
        return sortAsc ? a.qValue - b.qValue : b.qValue - a.qValue;
      } else {
        const left = a[sortBy] || "";
        const right = b[sortBy] || "";
        return sortAsc
          ? left.localeCompare(right)
          : right.localeCompare(left);
      }
    });

  // Table header config
  const columns = [
    { key: "gameId", label: "Game ID" },
    { key: "playerId", label: "Player ID" },
    { key: "hand", label: "Hand" },
    { key: "action", label: "Action (Suit)" },
    { key: "qValue", label: "Q-Value" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Q-table Visualizer</h1>
      <input
        type="text"
        className="border rounded p-2 mb-4 w-full"
        placeholder="Search by state or action..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-2xl">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className="p-2 text-left cursor-pointer select-none"
                  onClick={() => {
                    if (sortBy === col.key) setSortAsc(!sortAsc);
                    else {
                      setSortBy(col.key);
                      setSortAsc(true);
                    }
                  }}
                >
                  <span className="inline-flex items-center">
                    {col.label}
                    {sortBy === col.key ? (
                      sortAsc ? (
                        <span className="ml-1">▲</span>
                      ) : (
                        <span className="ml-1">▼</span>
                      )
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center text-gray-400 p-6">
                  No results found.
                </td>
              </tr>
            )}
            {filtered.map((row, idx) => (
              <tr
                key={idx}
                className={`border-t transition ${
                  row.qValue > 0
                    ? "bg-green-50"
                    : row.qValue < 0
                    ? "bg-red-50"
                    : "bg-white"
                }`}
              >
                <td className="p-2 font-mono">{row.gameId}</td>
                <td className="p-2 font-mono">{row.playerId}</td>
                <td className="p-2 font-mono">{row.hand}</td>
                <td className="p-2">{row.action}</td>
                <td className="p-2 font-mono">{row.qValue.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
