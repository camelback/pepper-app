'use client'
import { useEffect, useState } from "react";
import { startConnection, addPlayer, sendMessage } from "../utils/signalr";
import "../css/GameRoom.css";

export default function GameRoom() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [actions, setActions] = useState([]);
  const [input, setInput] = useState("");
  const [gameId, setGameId] = useState("");
  const [joined, setJoined] = useState(false);
  const [hands, setHands] = useState({});
  const positions = ["pos-top", "pos-left", "pos-bottom", "pos-right"];
  

  useEffect(() => {
    const initializeConnection = async () => {
      await startConnection(
        // onPlayerAdded
        (newPlayer) => setPlayers((prev) => [...new Set([...prev, newPlayer])]),
  
        // onPlayerRemoved
        (removedPlayer) =>
          setPlayers((prev) => prev.filter((p) => p !== removedPlayer)),
  
        // onPlayerList (initial)
        (list) => setPlayers(list),
  
        // onGameJoined
        (gid) => setGameId(gid),
  
        // onAction (game log/chat)
        (action) => {
          setActions((prev) => [
            ...prev,
            `${action.playerName} ${action.action} (${new Date(
              action.timestamp
            ).toLocaleTimeString()})`
          ]);
        },
  
        // onHandsDealt
        (handsData) => {
          setHands(handsData);
        }
      );
    };
  
    initializeConnection();
  }, []);

  const join = async () => {
    if (playerName.trim()) {
      await addPlayer(playerName.trim());
      setJoined(true);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage(input.trim());
      setInput("");
    }
  };

  const getPlayersInPositionOrder = () => {
    const myIndex = players.findIndex(p => p === playerName);
    if (myIndex === -1) return [];
  
    // Rotate players so that current player is at index 0
    return [...players.slice(myIndex), ...players.slice(0, myIndex)];
  };

  const orderedPlayers = getPlayersInPositionOrder();

  const getCardRotation = (side, index, total) => {
    const base = (index - (total - 1) / 2) * 10;
    if (side === "pos-left") return base - 90;   // rotate back
    if (side === "pos-right") return base + 90;  // rotate back
    return base;
  };

  return (
    <div className="min-h-screen bg-green-800 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Multiplayer Card Table</h1>

      {!joined ? (
        <div className="space-x-2">
          <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter name"
            className="p-2 text-black"
          />
          <button className="bg-blue-600 px-4 py-2 rounded" onClick={join}>Join Game</button>
        </div>
      ) : (
        <>
          <p className="mb-4">
            You joined <strong>{gameId}</strong> as <strong>{playerName}</strong>
        </p>

          <div className="card-table">
            {positions.map((pos, i) => {
              const p = orderedPlayers[i];
              if (!p) return null;

              const isRobot = p.startsWith("Robot-");
              const hand = hands[p] || [];
              
              return (
                <div key={i}>
                  {/* Card hand */}
                  <div className="card-hand">
                    {hand.map((card, cardIndex) => (
                        <div
                            key={cardIndex}
                            className="card-position hover-raise"
                            style={{ left: `${cardIndex * 20}px`, zIndex: cardIndex }}>
                      <img src={`/cards/${isRobot ? "RED_BACK" : card}.svg`} alt={card} />
                      </div>
                    ))}
                  </div>
            
                  {/* Player name */}
                  <div className={`player ${isRobot ? "robot" : "human"} ${pos}`}>
                    {p}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 w-full max-w-lg">
            <h3 className="text-xl mb-2">Game Log</h3>
            <div className="game-log">
              {actions.map((a, i) => (
                <div key={i} className="text-sm">{a}</div>
              ))}
            </div>

            <div className="chat-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 text-black"
                placeholder="Say something..."
              />
              <button className="bg-yellow-500 px-4 py-2 rounded text-black" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}