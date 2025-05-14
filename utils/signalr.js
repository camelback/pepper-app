import * as signalR from "@microsoft/signalr";

let connection;
let currentGameId = null;

export async function startConnection(setGameState) {
  if(connection) return connection;
    
        connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5288/gamehub")
        .withAutomaticReconnect()
        .build();
    
        connection.on("ReceiveGameState", (gameState) => {
            setGameState(gameState);
        });

        connection.on("GameOver", (finalState) => {
          alert("🎉 AI game complete!");
        });

      //   connection.on("ReceiveGameList", (games) => {
      //     setGameState(games);
      // });
        // connection.on("TrainingComplete", () => {
        //   alert("✅ AI training completed!");
        //   //invoke(connection, "GetAllGames");
        // });
        await connection.start();
    return connection;
    
  }
  
  export function addPlayer(name) {
    if (!connection) throw new Error("SignalR not connected");
    return connection.invoke("AddPlayer", name);
  }
  
  export function discardCardSignalR(playerId, card) {
    const pld = {
        playerId:playerId,
        card:card
    }
    return connection.invoke("DiscardCard", pld);
  }
  export function startRobotTraining(count) {
    if(!connection) throw new Error("SignalR not connected");
    return connection.invoke("StartRobotTraining", count);
  }
  export function discardRobotCardSignalR(playerId, card) {
    const pld = {
      playerId:playerId,
      card:card
  }
    return connection.invoke("PlayRobotTurn", pld);
  }
  
  export function getAllGames() {
    if (!connection) throw new Error("SignalR not connected");
    return connection.invoke("GetAllGames2");
  }
  export function dealCards(gameId) {
    if (!connection) throw new Error("SignalR not connected");
    return connection.invoke("DealCards", gameId);
  }
  export function startAiGame() {
    if (!connection) throw new Error("SignalR not connected");
    return connection.invoke("StartAiGame");
  }
  export async function invoke(connection, methodName, ...args) {
    if (!connection || !methodName) {
      console.error("SignalR invoke error: missing connection or method");
      return;
    }
  
    try {
      return await connection.invoke(methodName, ...args);
    } catch (err) {
      console.error(`SignalR invoke '${methodName}' failed:`, err);
    }
  }
  
// export const startConnection = async (
//     onPlayerAdded,
//     onPlayerRemoved,
//     onPlayerList,
//     onGameJoined,
//     onAction,
//     onHandsDealt,
//     onCardDiscarded,
//     setGameState
//     ) => {
//     connection = new signalR.HubConnectionBuilder()
//         .withUrl(process.env.NEXT_PUBLIC_SIGNALR_URL || "http://localhost:5288/gamehub")
//         .withAutomaticReconnect()
//         .build();

//     connection.on("PlayerAdded", onPlayerAdded);
//     connection.on("PlayerRemoved", onPlayerRemoved);
//     connection.on("CurrentPlayers", onPlayerList);
//     connection.on("GameJoined", onGameJoined);
//     connection.on("ReceiveAction", onAction);
//     connection.on("HandsDealt", onHandsDealt);
//     connection.on("CardDiscarded", onCardDiscarded);
//     connection.on("ReceiveGameState", (newGameState) => {
//         console.log("ReceiveGameState", newGameState);
//         setGameState(newGameState);
//     })
//     connection.on("Error", (error) => {
//         alert(error);
//     });

//     try {
//         await connection.start();
//         console.log("SignalR connected");
//     } catch (err) {
//         console.error("SignalR connection failed:", err);
//     }
// };

// export const sendMessage = async (message) => {
//     if (connection) {
//         await connection.invoke("SendMessage", message);
//     }
// };

// export const addPlayer = async (playerName) => {
//     if (connection) {
//         let test = await connection.invoke("AddPlayer", playerName);
//         console.log("test",test);
//     }
// }

// export const discardCardSignalR = async (payload) => {
//     return connection.invoke("DiscardCard", payload.player, payload.card);
//   }
  
//   export const playCard = async (playerId, card) => {
//     return connection.invoke("PlayCard", playerId, card);
//   }