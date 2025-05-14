const cardLookup = {
    suits: {
      //SPADES
      3 : { icon: "♠", color: "black" },
      0 : { icon: "♥", color: "red" }, //HEARTS
      1: { icon: "♦", color: "red" }, //DIAMONDS
      2: { icon: "♣", color: "black" }, //CLUBS
    },
    values: {
      14: "A",
      13: "K",
      12: "Q",
      11: "J",
      10: "10",
      9: "9",
      8: "8",
      7: "7",
      6: "6",
      5: "5",
      4: "4",
      3: "3",
      2: "2",
    },
  
    /**
     * Returns the local file path for a given card code.
     * @param {string} cardCode - The unique card code from the API (e.g., "AS", "KH").
     * @returns {string} - Path to the corresponding local SVG file.
     */
    getImageUrl(cardCode) {
      if (!cardCode) return "/cards/2C.svg"; // Fallback for missing images
      return `/cards/${cardCode}.svg`; // Matches the SVG filename in /public/cards/
    },
    getDefaultCard() {
      return '/cards/BLUE_BACK.svg';
    },
    getTrumpSuitName(suit){
      switch(suit){
        case "S":
          return 'Spades';
        case "C":
          return 'Clubs';
        case "D":
          return 'Diamonds';
        case "H":
          return 'Hearts';
        default:  
          return "";
      }
    },
    getTrumpSuitImage(suit){
      switch(suit){
        case "S":
          return '/cards/spades.png';
        case "C":
          return './cards/clubs.png';
        case "D":
          return './cards/diamonds.png';
        case "H":
          return './cards/hearts.png';
        default:
          return "";
      }
    }
  };
  
  
  export default cardLookup;