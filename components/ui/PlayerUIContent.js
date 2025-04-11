'use client'
import { useState, useEffect } from "react";
import { CardHand } from "./CardHand";
import "../../css/CardGame.css";

export function PlayerUIContent({ player, isActive, discard }) {
    const [currentBid, setBid] = useState(0);
    const [currentSuit, setSuit] = useState(0);
    const onBidChange = (player, bid) => {
      let temp = player.bid + bid;
      if(temp < 0) temp = 0;
      else if(temp > 6) temp = 6;
      setBid(temp);
      player.bid = temp;
    }
    const onSuitChange = (player, suit) => {
      let temp = suit;
      setSuit(temp);
      player.trump = temp;
    }
    return (
      <div className={`player-ui-content ${isActive ? "player-active" : ""}`}>
        <p>{player.name}</p>
        <CardHand player={player} cards={player.hand} discard={discard} isActive={isActive} />
        <div className="bid-controls">
          <button onClick={() => onBidChange(player, 1)}>▲</button>
          <span className="bid-display" >Bid : {currentBid}</span>
          <button onClick={() => onBidChange(player, -1)}>▼</button>
          <select className="suit-drop-down"
            value={player.trump || ""}
            onChange={(e) => onSuitChange(player, e.target.value)}
          >
            <option value="">----</option>
            <option value="♠">  ♠  </option>
            <option value="♥">  ♥  </option>
            <option value="♦">  ♦  </option>
            <option value="♣">  ♣  </option>
          </select>
      </div>
      </div>
    );
  }
  