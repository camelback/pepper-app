'use client'
import { useState, useEffect } from "react";
import { createGame, shuffle, deal, discardCard, getDiscardHand, submitGame } from "@/services/gameService";
import { Button } from "../components/ui/button";
import { CardComponent } from "../components/ui/Card";
import CardGameTable from "./CardGameTable";
import {GameCardPile } from "../components/ui/GameCardPile";
import { ShuffledDeck } from "../components/ui/ShuffledDeck"; 
import { startConnection, addPlayer, getAllGames,sendMessage,discardCardSignalR, discardRobotCardSignalR } from "../utils/signalr";
import { AddPlayerUI } from "../components/ui/AddPlayerUI";
import "../css/CardGame.css";
const GAME_PHASES = {
  SETUP: "setup",
  BIDDING: "bidding",
  RESOLVE_BID: "resolve_bid",
  DEAL: "deal",
  PLAY_TURN: "play_turn",
  RESOLVE_ROUND: "resolve_round",
  NEXT_ROUND: "next_round",
  GAME_OVER: "game_over"
};
export default function GameBoard({  }) {
  const [name, setName] = useState(null);
  //const { players2, sendPlayerUpdate } = useGameHub(name);

  const [game, setGame] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPlayerCards, setLoadingCards] = useState(false);
  const [error, setError] = useState(null);
  const [activePlayerId, setActivePlayerId] = useState(1);
  const [discardHand, setDiscardDeck] = useState(null);
  const [restart, setRestart] = useState(false);

  // const [players] = useState([
  //   { id: 1, name: "Player 1", cardHand: ["A♠", "10♦", "J♣", "7♥", "K♠"] },
  //   { id: 2, name: "Player 2", cardHand: ["2♠", "5♦", "9♣", "Q♥", "4♠"] },
  //   { id: 3, name: "Player 3", cardHand: ["3♠", "8♦", "6♣", "A♥", "J♠"] },
  //   { id: 4, name: "Player 4", cardHand: ["K♦", "Q♠", "10♣", "8♥", "2♦"] },
  // ]);

  const [deck] = useState(["2♣", "3♠", "4♦", "5♥", "6♠", "7♣", "8♦", "9♥", "10♠", "J♦", "Q♥", "K♣", "A♦"]);
  const [phase, setPhase] = useState(GAME_PHASES.SETUP);
  const [activePlayerIdx, setActivePlayerIdx] = useState(1);
  const [bids, setBids] = useState([]);
  const [leaderId, setLeaderId] = useState(null);
  //const [gameState, setGameState] = useState(false);

  // SignalR
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [actions, setActions] = useState([]);
  const [input, setInput] = useState("");
  const [gameId, setGameId] = useState("");
  const [joined, setJoined] = useState(false);
  const [hands, setHands] = useState([]);
  const positions = ["pos-top", "pos-left", "pos-bottom", "pos-right"];
  const [addPlayerUI, setAddPlayerUI] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [connectionReady, setConnectionReady] = useState(false);
  const [games, setGames] = useState([]);
  // if (process.env.NEXT_PUBLIC_DEBUG == "true") {
  //   console.log("DEBUGGING enabled");
  // }
  useEffect(() => {
    startConnection(setGameState).then(() => {
      setConnectionReady(true);
    });
    // const initializeConnection = async () => {
    //   startConnection(() => {}).then(() => {
    //         getAllGames().then(setGames);
    //       });
    //   // await startConnection(
    //   //   // onPlayerAdded
    //   //   (newPlayer) => setPlayers((prev) => [...new Set([...prev, newPlayer])]),
  
    //   //   // onPlayerRemoved
    //   //   (removedPlayer) =>
    //   //     setPlayers((prev) => prev.filter((p) => p !== removedPlayer)),
  
    //   //   // onPlayerList (initial)
    //   //   (list) => setPlayers(list),
  
    //   //   // onGameJoined
    //   //   (gid) => setGameId(gid),
  
    //   //   // onAction (game log/chat)
    //   //   (action) => {
    //   //     setActions((prev) => [
    //   //       ...prev,
    //   //       `${action.playerName} ${action.action} (${new Date(
    //   //         action.timestamp
    //   //       ).toLocaleTimeString()})`
    //   //     ]);
    //   //   },
  
    //   //   // onHandsDealt
    //   //   (handsData) => {
    //   //     console.log("hands dealt", handsData);
    //   //     const lHands = handsData;
    //   //     const keys = Object.keys(lHands);
    //   //     const newHandsObj = [];
    //   //     for(let i=0; i<keys.length; i++){
    //   //       newHandsObj.push(handsData[keys[i]]);
    //   //     }
    //   //     //let test = handsData.json();
    //   //     //console.log("test", test);
    //   //     console.log("test", newHandsObj);
    //   //     setHands(newHandsObj);
    //   //   }

    //     // onCardDiscarded
    //   //);
    // };
  
    // initializeConnection();
  }, []);

  useEffect(() => {
    if (gameState?.players?.length < 4) return;
      console.log("gameState", gameState);
      setGameState(gameState);
    // Fully populated game, update UI
  }, [gameState]);

  const updateGameState = () => {

  }
  const advancePhase = async() => {
    switch (phase) {
      case GAME_PHASES.SETUP:
          // create deck
          // shuffle 
          // discard
          mainGameLoop();
          //await handleShuffleButton();
          //await handleDealButton();
        setPhase(GAME_PHASES.BIDDING);
        break;
      case GAME_PHASES.BIDDING:
        setPhase(GAME_PHASES.RESOLVE_BID);
        break;
      case GAME_PHASES.RESOLVE_BID:
        const validBids = bids.filter(b => b.bid > 0);
        if (validBids.length > 0) {
          const winner = validBids.sort((a, b) => b.bid - a.bid)[0];
          setLeaderId(winner.playerId);
          setActivePlayerId(winner.playerId);
        }
        setPhase(GAME_PHASES.DEAL);
        break;
      case GAME_PHASES.DEAL:
        setPhase(GAME_PHASES.PLAY_TURN);
        break;
      case GAME_PHASES.PLAY_TURN:
        setPhase(GAME_PHASES.RESOLVE_ROUND);
        break;
      case GAME_PHASES.RESOLVE_ROUND:
        setPhase(GAME_PHASES.NEXT_ROUND);
        break;
      case GAME_PHASES.NEXT_ROUND:
        setPhase(GAME_PHASES.PLAY_TURN);
        break;
      default:
        setPhase(GAME_PHASES.GAME_OVER);
    }
  };
  
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const mainGameLoop = async() => {
    setGameState(true);
    while(true) {
      console.log("Delay start");
      await start();
      sleep(2000);
      console.log("Delay end");
      break;
    }
  }

  const start = async () => {
    try {
      setLoading(true);
      const gameData = await createGame();
      setGame(gameData);
      const gameData2 = await shuffle(gameData.gameId);
      setGame(gameData2);
      const gameData3 = await deal(gameData.gameId);
      
      let suits = ["♠", "♥", "♦", "♣"];
      suits = suits.sort(() => Math.random() - 0.5);
      gameData3.players[0].trump = suits[0];
      gameData3.players[1].trump = suits[1];
      gameData3.players[2].trump = suits[2];
      gameData3.players[3].trump = suits[3];

      let suits2 = ["spades", "hearts", "diamonds", "clubs"];
      suits2 = suits2.sort(() => Math.random() - 0.5);
      gameData3.trump = suits2[0];
      setGame(gameData3);
      setLoaded(true);
    } catch (err) {
      setError("Failed to start game.");
    } finally {
      setLoading(false);
    }
  }

  const handleStartButton = async () => {
    try {
      setLoading(true);
      const gameData = await createGame();
      setGame(gameData);

      const discardData = await getDiscardHand();
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

  const getPlayerAt = (posIndex) => {
    if (!joined) return null;

    const myIndex = players.findIndex((p) => p === playerName);
    const positionIndex = (myIndex + posIndex) % players.length;

    return players[positionIndex];
  };

  const handleDealButton = async () => {
    try {
      setLoadingCards(true);
      const gameData = await deal(game.gameId);
      setGame(gameData);
      setDiscardDeck([]);
    } catch (err) {
      setError("Failed to deal cards.");
    } finally {
      setLoadingCards(false);
    }
  };
  const handleRestartButton = async() => {
      //setRestart(true);
  }
  
  const onCardDiscard = async (discardObj, robot) => {
    try {
      
      console.log("discardObj", discardObj);
      await discardCardSignalR(discardObj.playerId, discardObj.card);
      //Find the player
      const player = gameState.players.find(p => p.id === discardObj.playerId);
      if (!player) return;

      // Find the card in their hand
      const cardToDiscard = player.hand.find(card => card === discardObj.card);
      if (!cardToDiscard) return;
      
      await sleep(1000);
        const currId = gameState.currentTurnPlayerId;
        await discardRobotCardSignalR(currId,"");
        //Find the player
        const player2 = gameState.players.find(p => p.id === currId);
        if (!player2) return;

        // Find the card in their hand
        const cardToDiscard3 = player2.hand.find(card => card === currId);
        if (!cardToDiscard3) return;
      
        
      // Build updated players list
      // const updatedPlayers = gameState.players.map(p =>
      //   p.id === discardObj.playerId
      //     ? { ...p, hand: p.hand.filter(card => card !== discardObj.card) }
      //     : p
      // );

      // Update game state
      // setGame((prevGame) => {
      //   const newGame = [...prevGame];
      //   return newGame;
      //   //...prevGame,
      //   //players: updatedPlayers,
      //   //gameRoundDiscardPile: [...prevGame.gameRoundDiscardPile, cardToDiscard],
        
      // });
      
      //const tempPlyIdx = activePlayerId==4 ? 1 : activePlayerId+1;
      //setActivePlayerId(tempPlyIdx);
      

    
      //setGame(updatedGame);
      
    } catch (err) {
      setError("Failed to discard card", err);
    } finally {
      setLoadingCards(false);
    }
  };

  function getRandomizedSuits() {
    const suits = ["♠", "♥", "♦", "♣"];
    return suits.sort(() => Math.random() - 0.5);
  }

  const onSubmitGame = async() => {
    console.log("submitting game data");
    const gameDataResponse = await submitGame(game);
    console.log("game data response",gameDataResponse);
  }

  const handleAddPlayerButton = async () => {
    if(!addPlayerUI){
      //addPlayer("dummy").then(() => getAllGames().then(setGames));
      setAddPlayerUI(true);
    }
  
  }
  const handleAddPlayerTestButton = async () => {
    handleJoin("Ben");
  
  }

  const handleJoin = async (playerName) => {
    if (playerName.trim()) {
      //await addPlayer(playerName.trim());
      const resp = await addPlayer(playerName.trim());
      console.log(resp);
      setJoined(true);
      setAddPlayerUI(false);
      setPlayerName(playerName.trim());
    }
  }

  //if (loading) return <p className="text-white">Loading game...</p>;
  //if (loadingPlayerCards) return <p className="text-white">Loading player cards...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {joined && !addPlayerUI && gameState?.players?.length < 3 &&
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">🎴 Game Room</h1>

          <h2 className="mb-2">Current Turn:</h2>
          <p>{gameState.currentTurnPlayerId}
            {gameState?.players?.find((p) => p.id === gameState.currentTurnPlayerId)?.name ||
              "Waiting..."}
          </p>

          <h2 className="mt-4 mb-2">Players:</h2>
          <ul>
            {gameState?.players?.map((player) => (
              <li key={player.id}>
                {player.name} – {player.hand?.join(", ") || "No cards"}
              </li>
            ))}
          </ul>

          <h2 className="mt-4 mb-2">Discard Pile:</h2>
          <div>{gameState?.discardPile?.join(", ") || "Empty"}</div>
        
        
          
        </div>
    }
     {addPlayerUI &&
        <div>
            <AddPlayerUI join={handleJoin} />
        </div>
      }
      {!joined && !addPlayerUI &&
        <div>
          <div className="game-controls">
            <button onClick={advancePhase}>Next Phase: {phase}</button>
            <button className="btn start-game-btn" onClick={handleAddPlayerButton}>Add Player</button>
            <button className="btn start-game-btn" onClick={handleAddPlayerTestButton}>Test Add Player</button>
            <button className="btn start-game-btn" onClick={handleStartButton}>Start Game</button>
            <button className="btn restart-game-btn" onClick={handleRestartButton}>Restart Game</button>
            <button className="btn shuffle-btn" onClick={handleShuffleButton}>Shuffle Cards</button>
            <button className="btn deal-btn" onClick={handleDealButton}>Deal Cards</button>
            <button className="btn deal-btn" onClick={onSubmitGame}>Submit Game</button>
        </div>
      </div>
      }
      {gameState?.players?.length > 3 &&
        <div className="game-board">
          <CardGameTable 
              players={gameState?.players}
              hands={hands}
              activePlayerId={gameState?.currentTurnPlayerId}
              onCardClick={onCardDiscard} />
        
        </div>
      }
      {gameState?.discardPile?.length > 0 &&
        <div>
            <ShuffledDeck deck={gameState.cardDeck} />
            <GameCardPile discardDeck={gameState?.discardPile} />
          </div>
      } 

  </div>
  );
}

/*
//   {!joined && !addPlayerUI &&
    //     <div>
    //       <div className="game-controls">
    //         <button onClick={advancePhase}>Next Phase: {phase}</button>
    //         <button className="btn start-game-btn" onClick={handleAddPlayerButton}>Add Player</button>
    //         <button className="btn start-game-btn" onClick={handleStartButton}>Start Game</button>
    //         <button className="btn restart-game-btn" onClick={handleRestartButton}>Restart Game</button>
    //         <button className="btn shuffle-btn" onClick={handleShuffleButton}>Shuffle Cards</button>
    //         <button className="btn deal-btn" onClick={handleDealButton}>Deal Cards</button>
    //         <button className="btn deal-btn" onClick={onSubmitGame}>Submit Game</button>
    //     </div>
    //   </div>
    //   }
    //   {addPlayerUI &&
    //     <div>
    //         <AddPlayerUI join={handleJoin} />
    //     </div>
    //   }
    //   {joined && 
    //     <CardGameTable 
    //       players={players}
    //       hands={hands}
    //       activePlayerId="0"
    //       onCardClick={onCardDiscard} />
    //   }
    //   {/* {game &&
    //     <div>
    //         <CardGameTable players={game.players}
    //           deck={game.deck}
    //           activePlayerId={activePlayerId}
    //           discard={onCardDiscard} />
    //         <ShuffledDeck deck={game.deck} />
    //         <GameCardPile discardDeck={game.gameRoundDiscardPile} />
    //       </div>
    //   } 
    // </div>

*/