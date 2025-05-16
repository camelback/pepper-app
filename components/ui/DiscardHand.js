'use client'
import { useState, useEffect } from "react";
import CardComponent from "./Card";
import "../../css/CardGame.css";

export default function DiscardHand({player, cards, isDisabled, trumpSuit}) {
    const [playerCards, setCards] = useState([]);
        
    useEffect(() => {
          
        }, []);
    return (
        <div className="player-ui-content">
            
        <div data-testid="card-hand" className="card-hand">
            
            {cards.map((card, cardIndex) => (
            <div
                key={cardIndex}
                className="card-position"
                style={{ left: `${cardIndex * 20}px`, zIndex: cardIndex }}
            >
                <CardComponent player={player} 
                    card={card} 
                    disabled={isDisabled} />
            </div>
            ))}
        </div>
        </div>
    );
  }
  