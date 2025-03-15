'use client'
import { useState, useEffect } from "react";
import { createGame, shuffle, deal, discardCard } from "@/services/gameService";
import { Button } from "../components/ui/button";
import { CardComponent } from "../components/ui/Card";
import CardGameTable from "./CardGameTable";

import {GameCardPile } from "../components/ui/GameCardPile";

import { ShuffledDeck } from "../components/ui/ShuffledDeck";
import "../app/CardGame.css";

export default function GameBoard({  }) {
  const [game, setGame] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPlayerCards, setLoadingCards] = useState(false);
  const [error, setError] = useState(null);
  const [activePlayerId, setActivePlayerId] = useState(1);
  const [discardedDeck, setDiscardDeck] = useState([]);
  const [restart, setRestart] = useState(false);
  if (process.env.NEXT_PUBLIC_DEBUG == "true") {
    console.log("DEBUGGING enabled");
  }
  useEffect(() => {

  }, []);

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
  const handleDealButton = async () => {
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
  const handleRestartButton = async() => {
      //setRestart(true);
  }
  const onCardDiscard = async (card) => {
    try {
      console.log(card);
      console.log("gameId", game.gameId);
      const discardData = await discardCard(game.gameId, card);
      setDiscardDeck(discardData);
      removeCardFromPlayerHand(card);
      //newGame.deck.push(card);
      //setGame(newGame);

    } catch (err) {
      setError("Failed to discard card", err);
    } finally {
      setLoadingCards(false);
    }
  };

  const removeCardFromPlayerHand = (card) => {
    const updatedGame = game;
    updatedGame.players[0].hand.filter(c => c.code != card.code);
    setGame(updatedGame);
    console.log("card removed from player 0");
  }

  //if (loading) return <p className="text-white">Loading game...</p>;
  //if (loadingPlayerCards) return <p className="text-white">Loading player cards...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="game-board">
      <div className="game-controls">
        <button className="btn start-game-btn" onClick={handleStartButton}>Start Game</button>
        <button className="btn restart-game-btn" onClick={handleRestartButton}>Restart Game</button>
        <button className="btn shuffle-btn" onClick={handleShuffleButton}>Shuffle Cards</button>
        <button className="btn deal-btn" onClick={handleDealButton}>Deal Cards</button>
      </div>
      {game &&
        <div>
            <CardGameTable players={game.players}
              deck={game.deck}
              activePlayerId={activePlayerId}
              discard={onCardDiscard} />
            <ShuffledDeck deck={game.deck} />
            <GameCardPile discardDeck={discardedDeck} restart={restart} />
          </div>
      }
    </div>

  );
}
