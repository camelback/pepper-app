const API_GAMES_URL = "http://localhost:5288/games";
const API_SHUFFLE_URL = "http://localhost:5288/games";

/**
 * Fetches a new game with the specified number of players.
 * @param {number} numPlayers - Number of players in the game.
 * @returns {Promise<Object>} - Returns a game object with deck ID and player hands.
 */
export async function createGame(NumberOfPlayers) {
  try {
    if(NumberOfPlayers != 4) NumberOfPlayers = 4;
    const response = await fetch(`${API_GAMES_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(NumberOfPlayers),
    });
    if (!response.ok) {
        throw new Error('Failed to submit guess');
    }
    const data = await response.json();
    console.log("PepperAPI Game response data", data);
    return data;
  
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
}

export async function shuffle(id) {
  try {
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

export async function deal(id) {
  try {
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