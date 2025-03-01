'use client'
import { PlayerUI } from "./ui/PlayerUI";
import { PlayerUIContent } from "../components/ui/PlayerUIContent";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import {CardHand} from "../components/ui/CardHand";
import {ShuffledDeck } from "../components/ui/ShuffledDeck";
import "../app/CardGame.css";

export default function CardGameTable({ players, deck, discard, activePlayerId }) {
  const defaultPositions = ["bottom", "left", "top", "right"]

  const [_players] = useState([
    { id: 1, name: "Player 1", position: "bottom" },
    { id: 2, name: "Player 2", position: "left" },
    { id: 3, name: "Player 3", position: "top" },
    { id: 4, name: "Player 4", position: "right" },
  ]);

  return (
    <div className="card-game-container">
    
      <div className="card-game-table">
        <div className="table-center">
          Card Table
        </div>
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            className={`player-position ${getPositionClass(defaultPositions[index % defaultPositions.length])}`}
          >
            <PlayerUI  isActive={player.id === activePlayerId}>
              <PlayerUIContent player={player} discard={discard} isActive={player.id === activePlayerId} />
            </PlayerUI>
          </motion.div>
        ))}
      </div>
      </div>
  );
}

function getPositionClass(position) {
  switch (position) {
    case "bottom":
      return "position-bottom";
    case "left":
      return "position-left";
    case "top":
      return "position-top";
    case "right":
      return "position-right";
    default:
      return "";
  }
}
