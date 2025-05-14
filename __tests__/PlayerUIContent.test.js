import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import PlayerUIContent from "../components/ui/PlayerUIContent.js";

describe("PlayerUIContent", () => {
  const testCards = ["AS", "KS", "QS", "JS", "10S", "9S"];
 
  it("renders player name", () => {
    render(
      <PlayerUIContent 
        player="Player1"
        hand={testCards} 
        onCardClick={() => {}}
        isDisabled="false" />
      );
      const playerNameElement = screen.getByTestId('player-Player1');
      expect(playerNameElement).toBeInTheDocument();
  });

  it("renders all player's cards", () => {
    render(
      <PlayerUIContent 
        player="Player1"
        hand={testCards} 
        onCardClick={() => {}}
        isDisabled="false" />
      );
      //Should render all cards
      const cardElements = testCards.map((name) => screen.getByTestId(`card-${name}`));
      expect(cardElements.length).toBe(testCards.length);
  });

  it("calls onCardClick when a card is clicked", () => {
    const mockOnCardClick = jest.fn();
    render(
      <PlayerUIContent 
        player="Player1"
        hand={testCards} 
        onCardClick={mockOnCardClick}
        isDisabled="false" />
      );
      const cardElement = screen.getByTestId('card-AS');
      fireEvent.click(cardElement);

      expect(mockOnCardClick).toHaveBeenCalledTimes(1);
      expect(mockOnCardClick).toHaveBeenCalledWith('AS');
  });


  it("should NOT call onCardClick when a disabled card is clicked", () => {
    const mockOnCardClick = jest.fn();
    render(
      <PlayerUIContent 
        player="Player1"
        hand={testCards} 
        onCardClick={mockOnCardClick}
        isDisabled="true" />
      );
      const cardElement = screen.getByTestId('card-AS');
      fireEvent.click(cardElement);

      expect(mockOnCardClick).toHaveBeenCalledTimes(0);
  });
});