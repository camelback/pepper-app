import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import CardHand from "../components/ui/CardHand.js"

describe("CardHand", () => {
  const testCards = ["AS", "KS", "QS", "JS", "10S", "9S"];
 

  it("renders multiple Card components", () => {
    render(
      <CardHand 
        player="Player1"
        cards={testCards} 
        onCardClick={() => {}}
        isDisabled="false" />
      );
    
    // Should render all cards
    const cardElements = testCards.map((name) => screen.getByTestId(`card-${name}`));
    expect(cardElements.length).toBe(testCards.length);
  });

  it("calls onCardClick when a card is clicked", () => {
    const mockOnCardClick = jest.fn();
    render(
      <CardHand 
        player="Player1"  
        cards={testCards} 
        onCardClick={mockOnCardClick} 
        isDisabled="false"/>
      );

    const cardElement = screen.getByTestId('card-AS');
    fireEvent.click(cardElement);

    expect(mockOnCardClick).toHaveBeenCalledTimes(1);
    expect(mockOnCardClick).toHaveBeenCalledWith('AS');
  });

  it("should NOT call onCardClick when a disabled card is clicked", () => {
    const mockOnCardClick = jest.fn();
    render(
      <CardHand 
        player="Player1"  
        cards={testCards} 
        onCardClick={mockOnCardClick} 
        isDisabled="true"/>
      );

    const cardElement = screen.getByTestId('card-AS');
    fireEvent.click(cardElement);

    expect(mockOnCardClick).toHaveBeenCalledTimes(0);
  });
});