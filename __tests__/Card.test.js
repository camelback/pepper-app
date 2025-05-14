import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import CardComponent from "../components/ui/Card.js";

describe("Card", () => {
  it("renders enabled", () => {
    render(
        <CardComponent player="Player1" 
            card="AS"
            discard=""
            disabled="true" />
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", "/cards/BLUE_BACK.svg");
    expect(screen.getByRole("img")).toHaveAttribute("alt", "♥");
  });

  it("renders disabled", () => {
    render(
        <CardComponent player="Player1" 
        card="AS"
        disabled="false" />
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", "/cards/AS.svg");
    expect(screen.getByRole("img")).toHaveAttribute("alt", "♥");
  });

  it('calls onClick with the correct card name',() => {
    const mockClick = jest.fn();
    render(
        <CardComponent 
            player="Player1" 
            card="AS"
            onCardClick={mockClick}
            disabled="false" />
    );
    const card = screen.getByTestId('card-AS');
    fireEvent.click(card);
    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(mockClick).toHaveBeenCalledWith('AS');
  });

});