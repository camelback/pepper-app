import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import CardGameTable from "../components/CardGameTable.js";

describe("CardGameTable", () => {
  const testPlayers = ["Player1", "Bot1", "Bot2", "Bot3"];
  const testCards = ["AS", "KS", "QS", "JS", "10S", "9S"];
  const testCards2 = ["AD", "KD", "QD", "JD", "10D", "9D"];
  const testCards3 = ["AH", "KH", "QH", "JH", "10H", "9H"];
  const testCards4 = ["AC", "KC", "QC", "JC", "10C", "9C"];
  const testHands = [testCards, testCards2, testCards3, testCards4];
 
  it("renders all players", () => {
    render(
      <CardGameTable 
        players={testPlayers}
        hands={testHands} 
        onCardClick={() => {}}
        activePlayerId="0" />
      );
      const playerUIElement = screen.getByTestId('player-ui-Player1');
      const playerNameElement = screen.getByTestId('player-Player1');
      expect(playerNameElement).toBeInTheDocument();

     
  });

  it("renders player1 cards", () => {
    render(
      <CardGameTable 
        players={testPlayers}
        hands={testHands} 
        onCardClick={() => {}}
        activePlayerId="0" />
      );
      
      //Should render all cards
      const cardElements = testCards.map((name) => screen.getByTestId(`card-${name}`));
      screen.debug();
      expect(cardElements.length).toBe(testCards.length);
  });
});