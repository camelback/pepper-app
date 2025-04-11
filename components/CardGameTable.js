'use client'
import { useState, useEffect } from "react";
import { PlayerUI } from "./ui/PlayerUI";
import { PlayerUIContent } from "../components/ui/PlayerUIContent";

import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import {CardHand} from "../components/ui/CardHand";
import {ShuffledDeck } from "../components/ui/ShuffledDeck";
import { GameCardPile } from "./ui/GameCardPile";
import "../css/CardGame.css";

export default function CardGameTable({ players, deck, discard, activePlayerId }) {
  const defaultPositions = ["bottom", "left", "top", "right"]
  const [card, setCard] = useState(null);
  return (
    <div className="card-game-container">
      <div className="card-game-table">
        <div className="table-center">
          Card Table
        </div>
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            className={`player-position ${getPositionClass(defaultPositions[index % defaultPositions.length])}`} >
            {/* <PlayerUI  isActive={player.id === activePlayerId}> */}
              <PlayerUIContent player={player} discard={discard} isActive={index+1 == activePlayerId} />
            {/* </PlayerUI> */}
          </motion.div>
        ))}
      </div>
      
      {/* <GameCardPile discardDeck={deck} /> */}
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
