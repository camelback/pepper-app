'use client'
import { PlayerUI } from "./ui/PlayerUI";
import { PlayerUIContent } from "../components/ui/PlayerUIContent";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import {CardHand} from "../components/ui/CardHand";


export default function CardGameTable({ players }) {
  const defaultPositions = ["bottom", "left", "top", "right"]

  const [_players] = useState([
    { id: 1, name: "Player 1", position: "bottom" },
    { id: 2, name: "Player 2", position: "left" },
    { id: 3, name: "Player 3", position: "top" },
    { id: 4, name: "Player 4", position: "right" },
  ]);

  return (

      <div className="relative w-[600px] h-[600px] bg-green-800 rounded-full border-4 border-yellow-500 flex items-center justify-center">
        <div className="absolute flex items-center justify-center w-24 h-24 bg-gray-700 text-white rounded-full shadow-lg">
          Card Table
        </div>
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            className={`absolute flex flex-col items-center ${getPositionClass(defaultPositions[index % defaultPositions.length])}`}
          >
            <PlayerUI>
              <PlayerUIContent player={player} />
            </PlayerUI>
          </motion.div>
        ))}
      </div>
  );
}

function getPositionClass(position) {
  switch (position) {
    case "bottom":
      return "bottom-4 left-1/2 transform -translate-x-1/2";
    case "left":
      return "left-4 top-1/2 transform -translate-y-1/2";
    case "top":
      return "top-4 left-1/2 transform -translate-x-1/2";
    case "right":
      return "right-4 top-1/2 transform -translate-y-1/2";
    default:
      return "";
  }
}
