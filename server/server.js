const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3001;
const game_response = require('./game_response');
const shuffle_response = require('./shuffle_response');
const deal_response = require('./deal_response');

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

const discardPile = [];

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
app.post("/api/discard", (req, res) => {
   try{
        const responseObj = req.body; // Extract "name" from request body
        const id = responseObj.id;
        const card = responseObj.card;
        
        discardPile.push(card);

        res.json({ discard_pile: discardPile });
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

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
