'use client'
import { useState, useEffect } from "react";
import CardComponent from "./Card";
import "../../css/CardGame.css";

export default function CardHand({ player, cards, onCardClick, isDisabled }) {
    const [playerCards, setCards] = useState([]);
        
    useEffect(() => {
          
        }, []);
    return (
        
        <div data-testid="player-hand" className="card-hand">
            
            {player.hand.map((card, cardIndex) => (
            <div
                key={cardIndex}
                className="card-position"
                style={{ left: `${cardIndex * 20}px`, zIndex: cardIndex }}
            >
                <CardComponent player={player} 
                    card={card} 
                    onCardClick={onCardClick} 
                    disabled={isDisabled} />
            </div>
            ))}
        </div>
    );
  }
  