'use client'
import { useState, useEffect } from "react";
import CardHand from "./CardHand";
import "../../css/CardGame.css";

export default function PlayerUIContent({ player, hand, onCardClick, isActive, isDisabled }) {
    const [currentBid, setBid] = useState(0);
    const [currentSuit, setSuit] = useState(0);
    const [handSize, setHandSize] = useState(0);
    const [newHand, setHand] = useState([]);
    useEffect(() => {
      if(hand === undefined || hand === null) return;
       const sz = hand.length;
       //console.log("playeruicontent", hand);
       setHandSize(sz);
       setHand(hand);
       setBid(player.bidCount); 
      console.log("PlayerUIContent::isActive", isActive);
    }, []);

    const getActivePlayer = () => {
      const myIndex = players.findIndex(p => p === players[activePlayerId]);
      if (myIndex === -1) return [];
      const actPlayer = players[myIndex];
      
      console.log("activePlayer", actPlayer);
      console.log("isActive", isActive);
      setActivePlayer(actPlayer.name);
    };
    const onBidChange = (player, bid) => {
      let temp = player.bidCount + bid;
      if(temp < 0) temp = 0;
      else if(temp > 6) temp = 6;
      setBid(temp);
      //player.bid = temp; 
    }
    const onSuitChange = (player, suit) => {
      let temp = suit;
      setSuit(temp);
      player.trump = temp;
    }
    return (
      <div className={`player-ui-content ${isActive ? 'player-active' : ''}`}>
        <div data-testid={`player-${player.id}`}>{player.name}
          <div className={`player-trump-label`}>{player.trump}</div>
        </div>
        <CardHand player={player} cards={newHand} onCardClick={onCardClick} isDisabled={isDisabled} />
        
        <div className="bid-controls">
          <button onClick={() => onBidChange(player, 1)}>▲</button>
          <span className="bid-display" >Bid : {player.bid}</span>
          <button onClick={() => onBidChange(player, -1)}>▼</button>
          <div>
            <button className={`suit-button ${player.trump === 'C' ? 'active': ''}`}>♣</button>
            <button className={`suit-button ${player.trump === 'S' ? 'active': ''}`}>♠</button>
            <button className={`suit-button ${player.trump === 'D' ? 'active': ''}`}>♦</button>
            <button className={`suit-button ${player.trump === 'H' ? 'active': ''}`}>♥</button>
          </div>
          {/* <select className="suit-drop-down"
            value={player.trump || ""}
            onChange={(e) => onSuitChange(player, e.target.value)}
          >
            <option value="">--</option>
            <option value="S"> ♠ </option>
            <option value="H"> ♥ </option>
            <option value="D"> ♦ </option>
            <option value="C"> ♣ </option>
            <option value="0">N/A</option>
          </select> */}
      </div>
      </div>
    );
  }
  