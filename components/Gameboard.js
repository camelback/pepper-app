'use client'
import { useState, useEffect } from "react";
import { createGame, shuffle, deal } from "@/services/gameService";
import { Button } from "../components/ui/button";
import { CardComponent } from "../components/ui/Card";
import CardGameTable from "./CardGameTable";

export default function GameBoard({ reset = false }) {
  const [game, setGame] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPlayerCards, setLoadingCards] = useState(false);
  const [error, setError] = useState(null);

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

  if (loading) return <p className="text-white">Loading game...</p>;
  if (loadingPlayerCards) return <p className="text-white">Loading player cards...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-700">
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow" onClick={handleStartButton}>Start Game</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow">Restart Game</button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow" onClick={handleShuffleButton}>Shuffle Cards</button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow" onClick={handleDealButton}>Deal Cards</button>
      </div>
      {game && <CardGameTable  players={game.players} /> }
    </div>
    
  );
}
