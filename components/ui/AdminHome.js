'use client'
import { useState, useEffect } from "react";
import { Button } from "./button";
import CardComponent from "./Card";
import PlayerUIContent from "../ui/PlayerUIContent";
import { GameCardPile } from "./GameCardPile";
import DiscardHand from "../ui/DiscardHand";

import { motion } from "framer-motion";
import {
  startConnection, addPlayer, invoke,
  getAllGames, sendMessage, startRobotTraining,
  startAiGame, discardRobotCardSignalR
} from "../../utils/signalr";


import "../../css/CardGame.css";

export default function AdminHome({ }) {

  const [connection, setConnection] = useState(null);
  const [games, setGames] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [connectionReady, setConnectionReady] = useState(false);
  const [trickGameState, setTrickGameState] = useState(null);
  const [pepperGameState, setPepperGameState] = useState(null);

  useEffect(() => {
    //useEffect(() => {
    const setupSignalR = async () => {
      const conn = await startConnection();

      conn.on("ReceiveGameState", (results) => {
        //console.log("Game results received:", results);
        setGameState(results); // store in state
        //const newGames = games;
        //newGames.push(results);
        //setGames(newGames);
        //console.log(newGames);
        // setGames((prevGames) => {
        //   const existingIds = new Set(prevGames.map((g) => g.id));
        //   const newGames = incomingGames.filter((g) => !existingIds.has(g.id));
        //   return [...prevGames, ...newGames];
        // });
      });

      conn.on("ReceiveTrickGameState", (results) => {
        console.log("TrickGameResults receivd:", results);
        setTrickGameState(results);
        
      });
      conn.on("ReceivePepperGameState", (results) => {
        console.log("ReceivePepperGameState receivd:", results);
        setTrickGameState(results);
        
      });
      

      conn.on("TrainingComplete", (status) => {
        console.log("Training complete", status);
      });

      setConnection(conn);
    };

    setupSignalR();
    //}, []);

    // const init = async () => {
    //   const conn = await startConnection(setGameState);

    //   conn.on("ReceiveGameList", (gameList) => {
    //     console.log("Received game list:", gameList);
    //     const _games = gameList;
    //     setGames(_games);
    //     //setGames(gameList);
    //   });
    // conn.on("TrainingComplete", (status) => {
    //   alert("Training complete", status);
    // });
    // //  getAllGames();

    // init();
    //};
  }, []);


  useEffect(() => {
    // if (gameState?.players?.length < 4) return;
    console.log("gameState AdminHome", gameState);
    //setGameState(prev => [...prev, setGameState]);
    setGameState(gameState);
    // Fully populated game, update UI
  }, [gameState]);

  const handleTrain = async () => {
    startRobotTraining(10000);
    //console.log("handleTrain complete");
    //getAllGames();
  };
  const handleStartAiGame = async () => {
    let result = await startAiGame();
  };


  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Button onClick={handleTrain}>Train AI (10k episodes)</Button>
      <Button onClick={handleStartAiGame}>
        Watch AI Play
      </Button>
      <div>
      {pepperGameState && pepperGameState.trickGames.length > 0 &&
       (pepperGameState.trickGames.map((trick, tIndex) => (
        
        <div key={tIndex}>{tIndex}</div>
       ))
       )

      }</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gameState && gameState?.players.length > 3 &&
          (gameState.players.map((player, index) => (

            <motion.div
              key={index}
              data-testid={`player-ui-${player.name}`}
              className={`player-position`}
              style={{ left: `${index * 200}px`, zIndex: index }} >

              <PlayerUIContent
                player={player}
                hand={player.hand}
                onCardClick={() => { }}
                isActive={player.id === gameState.currentTurnPlayerId}
                isDisabled={player.isRobot}
              />

            </motion.div>
            
          )))}

          {gameState && gameState?.discardPile?.length > 0 &&
              <div
                data-testid={`player-ui-dealer`}
                className={`player-position`}
                style={{ left: `${4 * 200}px`, zIndex: 4}}
              >

                <div className={`player-ui-content`}
                  style={{height:`${208}px` }}
                >
                  <div >{`Dealer`}
                    <div className={`player-trump-label`}>{gameState.trumpSuit}</div>
                </div>
                  <DiscardHand
                    player="Dealer"
                    cards={gameState.discardPile}
                    isDisabled="true"
                    trump={gameState.trumpSuit}
                  />

                </div>
              </div>
            
          }
        



      </div>
    </div>
  );
}


function getPositionClass(position) {
  //console.log(position);
  switch (position) {
    case "bottom":
      return "position-bottom";
    case "left":
      return "position-left";
    case "top":
      return "position-top";
    case "right":
      return "position-right";
    default:
      return "";
  }
}

/*{<div key={player.name}>{player.name}</div>
              <div data-testid="player-hand" className="card-hand">
                <CardHand player={player} cards={newHand} onCardClick={onCardClick} isDisabled={isDisabled} />
                 {player.hand.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="card-position"
                    style={{ left: `${cardIndex * 20}px`, zIndex: cardIndex }}
                  >
                    <CardComponent player={player}
                      card={card}
                      //onCardClick={onCardClick}
                      disabled="true"
                    />
                  </div>
                ))}
              </div>}*/

// <Card2 key={i} card={undefined} onClick={undefined} >
//   <h2 className="text-lg font-semibold">Game ID: {game}</h2>
//   <div className="space-x-2 mt-2">
//     <Button onClick={() => handleAddPlayer(game)}>Add Player</Button>
//     <Button onClick={() => handlePlayTurn(game)}>Play Turn</Button>
//   </div>
// </Card2>