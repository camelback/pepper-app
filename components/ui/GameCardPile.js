'use client'
import { useState, useEffect } from "react";
import "../../css/CardGame.css";
import { CardComponent } from "./Card";
export function GameCardPile({ discardDeck }) {
    const cardsPerRow = 4;
    //console.log("discardGame", discardDeck);
    return (
        <div className="discard-panel">
            <h3>Discard Pile</h3>
            {discardDeck.length === 0 ? (
                <p className="empty-text">No cards discarded yet</p>
            ) : (
                <div className="discard-grid">
                {discardDeck.map((card, index) => (
                    <div
                        key={card.code || index}
                        className="discard-card"
                        style={{ left: `${(index % 4) * 40}px`, top: `${Math.floor(index / 4) * 100}px` }}
                        >
                        <CardComponent card={card} />
                    </div>
                ))}
                </div>
            )}
        </div>
    );
  }