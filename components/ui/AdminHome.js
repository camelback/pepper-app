'use client'
import { useState, useEffect } from "react";
import { Button } from "./button";
import CardComponent from "./Card";
import PlayerUIContent from "../ui/PlayerUIContent";
import { GameCardPile } from "./GameCardPile";
import DiscardHand from "../ui/DiscardHand";
import CardGameStatsTabs from "../ui/CardGameStatsTabs";
import PepperEngineDashboard from "../ui/PepperEngineDashboard";
import { motion } from "framer-motion";
import {
  startConnection, addPlayer, invoke, getQTable,
  getAllGames, sendMessage, startRobotTraining, sendDiscardVotes,
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
  const [playerHandsState, setPlayerHandsState] = useState(null);
  const [bidComplete, setBidComplete] = useState(false);
  const [highestBidComplete, setHighestBidComplete] = useState(false);
  const [playerScoresState, setPlayerScores] = useState([]);
  const [pepperQData, setPepperQData] = useState({});
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
      //PlayersBidComplete
      conn.on("PlayersBidComplete", (results) => {
        console.log("PlayersBidComplete receivd:", results);
        setBidComplete(true);
        setGameState(results);
      });
      conn.on("HighestBidPicked", (results) => {
        console.log("HighestBidPicked receivd:", results);
        setGameState(results);

      });
      conn.on("PlayerTrickCardPlayed", (results) => {
        console.log("PlayerTrickCardPlayed receivd:", results);
        setGameState(results);

      });
      conn.on("TrickWinnerSet", (results) => {
        console.log("TrickWinnerSet receivd:", results);
        let test = [];
        for(let i=0; i<results.players.length;i++){
          test.push({name:results.players[i].name, score:results.players[i].winCount});
        }
        setPlayerScores(test);
        
        setGameState(results);
        //setBidComplete(false);
      });

      conn.on("ReceiveGameList", (gameList) => {
        console.log("Received game list:", gameList);
        const _games = gameList;
        setGames(_games);
      });

      conn.on("TrainingComplete", (status) => {
        console.log("Training complete", status);
      });

      conn.on("VoteStored", (status) => {
        console.log("VoteStored complete", status);
      });

      conn.on("GetQTable", (status) => {
        console.log("GetQTable complete", status);
        const data = JSON.parse(status);
        setPepperQData(data);
      });

      conn.on("GetPlayerTurnQTable", (status) => {
        console.log("GetQTable complete", status);
        const data = JSON.parse(status);
        setPepperQData(data);
      });

      setConnection(conn);
    };

    setupSignalR();
  }, []);


const discardVotes = [ ];
const discardHistory = [
  { player: "Alice", cards: ["3♠", "J♥", "7♦", "K♣"], time: Date.now() - 60000 },
  { player: "Bob", cards: ["4♣", "Q♦", "5♠", "2♥"], time: Date.now() - 30000 },
];

const miscLogs = [
  { message: "Game started", timestamp: Date.now() - 100000 },
  { message: "New round begins", timestamp: Date.now() - 50000 },
];
  // useEffect(() => {
  //   // if (gameState?.players?.length < 4) return;
  //   console.log("gameState AdminHome", gameState);
  //   //setGameState(prev => [...prev, setGameState]);
  //   setGameState(gameState);
  //   // Fully populated game, update UI
  // }, [gameState]);
  const handleVote = (vote) => {
    console.log("Vote feedback" + vote);
    discardVotes.push(vote);
  }
  const handleTrain = async () => {
    startRobotTraining(10000);
    //console.log("handleTrain complete");
    //getAllGames();
  };
  const handleStartAiGame = async () => {
    let result = await startAiGame(1);
  };
  const handlePlayTrick = async () => {
    let result = await startAiGame(2);
  };

  const handleSendVotes = async () => {
    let result = sendDiscardVotes(discardVotes);
  }
  const handleGetQTable = async () => {
    let result = await getQTable();
    //console.log("QTable"+ result);
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Button onClick={handleTrain}>Train AI (10k episodes)</Button>
      <Button onClick={handleStartAiGame}>
        Watch AI Play
      </Button>
      {
        bidComplete && 
        <Button onClick={handlePlayTrick}>
        Play Trick
      </Button>
      }
      <Button onClick={handleSendVotes}>
       Send Votes
      </Button>
      <Button onClick={handleGetQTable}>
       Get QTable
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bidComplete && !highestBidComplete && gameState && gameState?.players.length > 3 &&
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
                isActive={player.isActive}
                isDisabled={player.isRobot}
              />

            </motion.div>

          )))}

          {gameState && gameState?.discardPile &&
          <div
            data-testid={`player-ui-dealer`}
            className={`player-position`}
            style={{ left: `${4 * 200}px`, zIndex: 4 }}
          >

            <div className={`player-ui-content`}
              style={{ height: `${208}px` }}
            >
              <div >{`Discard Pile`}
                <div className={`player-trump-label`}>{gameState.trumpSuit}</div>
              </div>
              <DiscardHand
                player="Dealer"
                cards={gameState.discardPile}
                isDisabled="true"
                trump={gameState.trumpSuit}
                onVote={handleVote}
              />
              {gameState.winnerPlayerName && 
              <div>Winner: {gameState.winnerPlayerName}</div>}
            </div>
          </div>

        }
      </div>
      <PepperEngineDashboard data={pepperQData} />
      <CardGameStatsTabs
        playerScores={playerScoresState}
        discardHistory={discardHistory}
        miscLogs={miscLogs}
      />
      {/* <div>
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
            style={{ left: `${4 * 200}px`, zIndex: 4 }}
          >

            <div className={`player-ui-content`}
              style={{ height: `${208}px` }}
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




      </div> */}
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