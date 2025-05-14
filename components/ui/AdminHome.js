'use client'
import { useState, useEffect } from "react";
import { Button } from "./button";
import CardComponent from "./Card";
import { startConnection, addPlayer, invoke, 
  getAllGames, sendMessage,startRobotTraining, 
  startAiGame, discardRobotCardSignalR } from "../../utils/signalr";
import "../../css/CardGame.css";

export default function AdminHome({  }) {

        
    const [connection, setConnection] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const init = async () => {
      const conn = await startConnection();
      
      conn.on("ReceiveGameList", (gameList) => {
        console.log("Received game list:", gameList);
        const _games  = gameList;
        setGames(_games);
        //setGames(gameList);
      });
      conn.on("TrainingComplete", () => alert("Training complete"));
      //  getAllGames();
    };
    init();
  }, []);

    const handleTrain = () => {
        startRobotTraining(10000);
        console.log("handleTrain complete");
        getAllGames();
        };
    
        const handleAddPlayer = (gameId) => {
        if (connection) invoke(connection, "AddRobotPlayer", gameId);
        };
        
        const handleStartAiGame = () => {
            startAiGame();
            };
        const handlePlayTurn = (gameId) => {
        if (connection) invoke(connection, "PlayAsRobot", gameId);
        };
    return (
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleTrain}>Train AI (10k episodes)</Button>
          <Button onClick={handleStartAiGame}>
            Watch AI Play
            </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game, i) => (
              <div key={i}>
                {games[i].players.map((player,j) => (
                    <div key={player.name}>{player.name}</div>
                ))}
              {game.gameId}
              </div>
              // <Card2 key={i} card={undefined} onClick={undefined} >
              //   <h2 className="text-lg font-semibold">Game ID: {game}</h2>
              //   <div className="space-x-2 mt-2">
              //     <Button onClick={() => handleAddPlayer(game)}>Add Player</Button>
              //     <Button onClick={() => handlePlayTurn(game)}>Play Turn</Button>
              //   </div>
              // </Card2>
            ))}
          </div>
        </div>
      );
  }
  