const API_GAMES_URL = process.env.NEXT_PUBLIC_API_GAME;// "http://localhost:5288/games";
const API_DEAL_URL = process.env.NEXT_PUBLIC_API_DEAL;
const API_SHUFFLE_URL = process.env.NEXT_PUBLIC_API_SHUFFLE;
const API_DISCARD_URL = process.env.NEXT_PUBLIC_API_DISCARD;
const API_DISCARD_HAND_URL = process.env.NEXT_PUBLIC_API_DISCARD_HAND;
//const API_SHUFFLE_URL = "http://localhost:5288/games";
const DEBUG_API_GAME = "http://localhost:3001/api/games";
const DEBUG_API_SHUFFLE = "http://localhost:3001/api/deal";

export async function getGame() {
  try {
    const response = await fetch(`${API_GAMES_URL}`);
    const data = await response.json();
    console.log("getGame()", data);
    return data;
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
}
/**
 * Fetches a new game with the specified number of players.
 * @param {number} numPlayers - Number of players in the game.
 * @returns {Promise<Object>} - Returns a game object with deck ID and player hands.
 */
export async function createGame(NumberOfPlayers) {
  try {
    if(NumberOfPlayers != 4) NumberOfPlayers = 4;
    
    if(process.env.NEXT_PUBLIC_DEBUG === 'true'){
      const response = await getGame();
      return response;
    } 
    const  response = await fetch(`${API_GAMES_URL}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify(NumberOfPlayers),
      });
  
    
    
    if (!response.ok) {
        console.log(response);
        throw new Error('Failed to create game', response);
    }
    const data = await response.json();
    console.log("PepperAPI Game response data", data);
    return data;
  
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
}


export async function getShuffle() {
  try {
    const response = await fetch(`${API_SHUFFLE_URL}`);
    const data = await response.json();
    console.log("getShuffle()", data);
    return data;
  } catch (error) {
    console.error("Error get shuffled deck", error);
    throw error;
  }
}

export async function shuffle(id) {
  try {
    if(process.env.NEXT_PUBLIC_DEBUG === 'true'){
      const response = await getShuffle();
      return response;
    } 
    const resolvedUrl = API_GAMES_URL+"/"+id+"/shuffle2";
    const reqData = {
      id: id
    };
    const response = await fetch(`${resolvedUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    if (!response.ok) {
        throw new Error('Failed to submit guess');
    }
    const data = await response.json();
    console.log("PepperAPI Shuffle response data", data);
    return data;
  
  } catch (error) {
    console.error("Error shuffling deck:", error);
    throw error;
  }
}

export async function submitGame(game) {
  try {

    const resolvedUrl = API_GAMES_URL+"/"+game.id+"/game-scenario";
    const reqData = {
      
      data:game
    };
    const response = await fetch(`${resolvedUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    if (!response.ok) {
        throw new Error('Failed to submit guess');
    }
    const data = await response.json();
    console.log("PepperAPI Shuffle response data", data);
    return data;
  
  } catch (error) {
    console.error("Error shuffling deck:", error);
    throw error;
  }
}

export async function getDeal() {
  try {
    const response = await fetch(`${API_DEAL_URL}`);
    const data = await response.json();
    console.log("getDeal()", data);
    return data;
  } catch (error) {
    console.error("Error get game with cards dealt", error);
    throw error;
  }
}


export async function deal(id) {
  try {
    if(process.env.NEXT_PUBLIC_DEBUG === 'true'){
      const response = await getDeal();
      return response;
    } 
    const resolvedUrl = API_GAMES_URL+"/"+id+"/deal2";
    const reqData = {
      id: id
    };
    const response = await fetch(`${resolvedUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    if (!response.ok) {
        throw new Error('Failed to submit guess');
    }
    const data = await response.json();
    console.log("PepperAPI Deal response data", data);
    return data;
  
  } catch (error) {
    console.error("Error dealing cards:", error);
    throw error;
  }
}

export async function discardCardLocal(discardObj) {
  const reqData = {
    player: discardObj.player,
    card: discardObj.card
  };
  const response = await fetch(`${API_DISCARD_URL}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify(reqData),
  });
  if (!response.ok) {
      throw new Error('Failed to discard card');
  }
  const data = await response.json();
  console.log("PepperAPI Discard response data", data);
  return data;
}
export async function getDiscardHand() {
  try {
    const response = await fetch(`${API_DISCARD_HAND_URL}`);
    const data = await response.json();
    console.log("getDiscardHandde()", data);
    return data;
  } catch (error) {
    console.error("Error get discard hand", error);
    throw error;
  }
}
export async function discardCard(discardObj) {
  try {
    if(process.env.NEXT_PUBLIC_DEBUG === 'true'){
      const response = await discardCardLocal(discardObj);
      return response;
    } 
    const resolvedUrl = API_GAMES_URL+"/discard";
    const reqData = {
      player: discardObj.player,
      card: discardObj.card
    };
    const response = await fetch(`${resolvedUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(reqData),
    });
    if (!response.ok) {
        throw new Error('Failed to discard card');
    }
    const data = await response.json();
    console.log("PepperAPI Discard response data", data);
    return data;
  
  } catch (error) {
    console.error("Error discarding cards:", error);
    throw error;
  }
}