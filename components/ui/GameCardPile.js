'use client'
import "../../app/CardGame.css";
import { useState, useEffect } from "react";
import { CardComponent } from "./Card";
export function GameCardPile({ discardDeck }) {

    return (
        <div className="discard-deck">
        {discardDeck.map((card, cardIndex) => (
        <div
            key={cardIndex}
            className="card-position hover-raise"
            style={{ left: `${cardIndex * 20}px`, zIndex: cardIndex }} >
            
            <CardComponent card={card} />
        </div>
        ))}
    </div>
    );
  }