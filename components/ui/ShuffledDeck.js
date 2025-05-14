'use client'
import { useState, useEffect } from "react";

import "../../css/CardGame.css";
import CardComponent from "./Card";
export function ShuffledDeck({ deck }) {

    
    return (
        <div className="main-card-hand">
            <div>
                {deck.map((card, cardIndex) => (
                    <div
                        key={cardIndex}
                        className="card-position hover-raise"
                        style={{ left: `${cardIndex * 20}px`, zIndex: cardIndex }}
                    >
                        
                        <CardComponent card={card} />
                    </div>
                ))}
            </div>
    </div>
    );
  }