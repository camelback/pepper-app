const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3001;
const game_response = require('./game_response');
const shuffle_response = require('./shuffle_response');
const deal_response = require('./deal_response');
const discard_deck = require('./discard_deck');

// Enable CORS
app.use(cors());

// Captured JSON Response (Replace this with your actual response)
const jsonResponse = {
    "status": "success",
    "data": {
        "message": "This is the captured JSON response",
        "items": [
            { "id": 1, "name": "Item 1" },
            { "id": 2, "name": "Item 2" }
        ]
    }
};

const discardPile = {};

app.use(bodyParser.json()); // Parse JSON request body

// POST Endpoint that accepts a parameter
app.post("/api/game", (req, res) => {
    const { name } = req.body; // Extract "name" from request body
    console.log("req.body", req.body);
    if (false) {
        return res.status(400).json({ error: "Name parameter is required" });
    }

    res.json({ message: `Hello, ${name}! Your data has been received.` });
});

// POST Endpoint that accepts a parameter
// should return a new player object with 
// the proper number of cards
// also return a object containing discarded
// cards for the current game
app.post("/api/discard", (req, res) => {
   try{
        const { player, card } = req.body;
        console.log(player, card);
        const hand = player.hand;
        console.log(hand);
        
        const updatedHand = hand.filter(c => c.code !== card.code);
        console.log(updatedHand);
        return res.json(updatedHand);
   } catch {
    res.json({ "message": "error" });
   }

});


// API Endpoint
app.get("/api/data", (req, res) => {
    res.json(jsonResponse);
});

app.get("/api/game", (req, res) => {
    res.json(game_response);
});
app.get("/api/shuffle", (req, res) => {
    res.json(shuffle_response);
});
app.get("/api/deal", (req, res) => {
    res.json(deal_response);
});
app.get("/api/discard-deck", (req, res) => {
    res.json(discard_deck);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
