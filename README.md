# pepper-app

React next.js based application to play the card game Pepper. 

## Background

#### Card Deck
9 thru Ace cards only (all suits)

Jack of clubs is highest value card
Jack of spades is next highest

### Tests

SignalR:
    - Add Player
        - Separate instances
        - Single player (3 bots)
    - Start Game
        - 4 players must be assigned to game
        - Current game not in progress
    - Deal Cards
        - Each player has 6 cards
        - No player has duplicate cards in hand
        - No player has another player's card in hand
    - Determine Game winner
        - 
### Pepper Card Game Component Architecture

Gamebaord
    CardGameTable
        Player
            CardHand
            Card
        Discard Pile
    Game