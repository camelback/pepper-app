'use client'
import { useState, useEffect } from "react";
// import { PlayerUI } from "./ui/PlayerUI";
import PlayerUIContent from "../components/ui/PlayerUIContent";

import { motion } from "framer-motion";
// import { Button } from "../components/ui/button";
// import {CardHand} from "../components/ui/CardHand";
// import {ShuffledDeck } from "../components/ui/ShuffledDeck";
// import { GameCardPile } from "./ui/GameCardPile";
import "../css/CardGame.css";
import cardLookup from "../utils/cardLookup.js";

export default function CardGameTable({ players, onCardClick, activePlayerId }) {
  const defaultPositions = ["bottom", "left", "top", "right"]
  const [card, setCard] = useState(null);
  const [trumpSuit, setTrumpSuit] = useState("C");
  const localImageUrl = cardLookup.getTrumpSuitImage("C");
  const [activePlayer, setActivePlayer] = useState(null);
  useEffect(() => {
    console.log(players[0].hand);
     //const myIndex = players.findIndex(p => p === players[activePlayerId]);
    //if (myIndex === -1) return []; 
    const gameSuit = "C";
    console.log("CardGameTable::activePlayerId", activePlayerId);
    for(let i=0; i<players.length; i++){
      if(players[i].id === activePlayerId){
        console.log("Active player found", players[i].name);
      }
    }
    const myIndex = players.findIndex(p => p.id === activePlayerId);
      if (myIndex === -1) {
        console.log("could not find player by id");
        return;
      }
      const actPlayer = players[myIndex];
      
      console.log("activePlayer", actPlayer);
      setActivePlayer(actPlayer.name);


  }, []);

  

  const getPlayersInPositionOrder = () => {
    const myIndex = players.findIndex(p => p === players[activePlayerId]);
    if (myIndex === -1) return [];
  
    // Rotate players so that current player is at index 0
    return [...players.slice(myIndex), ...players.slice(0, myIndex)];
  };

  const orderedPlayers = getPlayersInPositionOrder();


  return (
    <div className="card-game-container">
      <div className="card-game-table">
        <div className="table-center">
          Card Table
        </div>
        {/* <div className="trump-suit-image">
          <img
            src={localImageUrl}
            alt="CardSuit"
            className="card-image" 
          />

        </div> */}
        {players.map((player, index) => (
          <motion.div
            key={index}
            
            data-testid={`player-ui-${player.name}`}
            className={`player-position ${getPositionClass(defaultPositions[index % defaultPositions.length])}`} 
            >
              <PlayerUIContent 
                player={player} 
                hand={player.hand}
                onCardClick={onCardClick} 
                isActive={player.isActive}
                isDisabled={player.isRobot}
                />
          </motion.div>
        ))}
      </div>
      
      {/* <GameCardPile discardDeck={deck} /> */}
      </div>
  );
}

function getPositionClass(position) {
  //console.log(position);
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
