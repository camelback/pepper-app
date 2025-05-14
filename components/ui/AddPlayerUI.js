'use client'
import { useEffect, useState } from "react";

import "../../css/GameRoom.css";

export function AddPlayerUI({join}) {
  const [playerName, setPlayerName] = useState("");
  


  const onJoin = async () => {
    if (playerName.trim()) {
      join(playerName.trim());
      
        //await addPlayer(playerName.trim());
    }
  };


  return (


        <div className="space-x-2">
          <input
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter name"
            className="p-2 text-black"
          />
          <button className="bg-blue-600 px-4 py-2 rounded" onClick={onJoin}>Join Game</button>
        </div>
  );
}