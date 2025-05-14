'use client'
import { useEffect, useState } from "react";
//import { useGameHub } from "@/hooks/useGameHub";
import { startConnection, sendMessage, addPlayer } from "../utils/signalr";
import { healthcheck} from "../services/baseTestService";
export default function GameBoardTest() {
  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    //if(players.length === 0) {
      startConnection(
        (user, message) => setMessages((prev) => [...prev, `${user}: ${message}`]),
        (player) => setPlayers((prev) => [...new Set([...prev, player])]),
        (playerList) => setPlayers(playerList),
        (removedPlayer) => setPlayers((prev) => prev.filter((p) => p !== removedPlayer)),
        (game) => setGameId(game)
      );

    
    // const init = async () => {
    //   await startConnection(
    //     (user, message) => setMessages(prev => [...prev, `${user}: ${message}`]),
    //     (player) => setPlayers(prev => [... new Set([...prev, player])]),
    //     (playerList) => setPlayers([...new Set(playerList)]), // Full sync
    //     (removedPlayer) => setPlayers(prev => prev.filter(p => p !== removedPlayer)),
    //     (game) => setGameId(game)
      
    //   );
    // };

    // init();
    //}
  }, []);

  const handleAddPlayer = async () => {
    if (name.trim()) {
      await addPlayer(name);
      setCurrentPlayer(name);
      setName("");
    }
  };

  const handleSend = async () => {
    if(!currentPlayer) return;
    await sendMessage(msg);
    setMsg("");
  };

  const handleStartButton = async () => {
      try {
        const gameData = await healthcheck();
        console.log(gameData);
      } catch (err) {
        //setError("Failed to start game.");
      } finally {
        
      }
    }
  
    const playerAction = {
      playerName: "Alice",
      action: "MOVE_LEFT",
      timestamp: new Date().toISOString()
    };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Game Lobby</h1>
      <button className="btn start-game-btn" onClick={handleStartButton}>Start Game</button>
        <br />
        <hr />
      {!currentPlayer && (
        <>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter player name"
          />
          <button onClick={handleAddPlayer}>Join Game</button>
        </>
      )}

      {currentPlayer && (
        <>
          <p>You are: <strong>{currentPlayer}</strong> in <strong>{gameId}</strong></p>

          <h3>Players in Game:</h3>
          <ul>
            {players.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          <h3>Chat</h3>
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={handleSend}>Send</button>

          <div style={{ marginTop: 20 }}>
            {messages.map((m, i) => (
              <p key={i}>{m}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
