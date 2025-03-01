'use client'
import { useState, useEffect } from "react";
import { createGame, shuffle, deal } from "@/services/gameService";
import { Button } from "../components/ui/button";
import { CardComponent } from "../components/ui/Card";
import CardGameTable from "./CardGameTable";

import {ShuffledDeck } from "../components/ui/ShuffledDeck";
import "../app/CardGame.css";

export default function GameBoard({ reset = false }) {
  const [game, setGame] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPlayerCards, setLoadingCards] = useState(false);
  const [error, setError] = useState(null);
  const [activePlayerId, setActivePlayerId] = useState(1);

  useEffect(() => {
    
  }, [reset]);
  
  const handleStartButton = async () => {
    try {
        setLoading(true);
        const gameData = await createGame();
        setGame(gameData);
        setLoaded(true);
      } catch (err) {
        setError("Failed to start game.");
      } finally {
        setLoading(false);
      }
  }

  const handleShuffleButton = async () => {
    try {
        setLoadingCards(true);
        const gameData = await shuffle(game.gameId);
        setGame(gameData);
      } catch (err) {
        setError("Failed to shuffle deck.");
      } finally {
        setLoadingCards(false);
      }
};
  const handleDealButton = async() => {
    try {
        setLoadingCards(true);
        const gameData = await deal(game.gameId);
        setGame(gameData);
      } catch (err) {
        setError("Failed to deal cards.");
      } finally {
        setLoadingCards(false);
      }
    };
    const discard = (card) => {
        try {
            console.log(card);
            const newGame = game;

            newGame.deck.push(card);
            setGame(newGame);

          } catch (err) {
            setError("Failed to deal cards.");
          } finally {
            setLoadingCards(false);
          }
        };

  //if (loading) return <p className="text-white">Loading game...</p>;
  //if (loadingPlayerCards) return <p className="text-white">Loading player cards...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="game-board">
      <div className="game-controls">
        <button className="btn start-game-btn" onClick={handleStartButton}>Start Game</button>
        <button className="btn restart-game-btn">Restart Game</button>
        <button className="btn shuffle-btn" onClick={handleShuffleButton}>Shuffle Cards</button>
        <button className="btn deal-btn" onClick={handleDealButton}>Deal Cards</button>
      </div>
      {game && 
        <div>
            <CardGameTable  players={game.players} 
                deck={game.deck} 
                activePlayerId={activePlayerId} 
                discard={discard} /> 
        <ShuffledDeck deck={game.deck} /></div>
      }
    </div>
    
  );
}
