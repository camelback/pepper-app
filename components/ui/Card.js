import cardLookup from "@/utils/cardLookup";
import "../../app/CardGame.css";

export function CardComponent({ card, discard }) {
  const suit = cardLookup.suits[card.suit] || {};
  const value = cardLookup.values[card.value] || card.value;
  const localImageUrl = cardLookup.getImageUrl(card.code);

  const discardEvent = (card) => {
    console.log("CardComponent: discardEvent()");
    discard(card);
  }
  return (
    <div className="card" onClick={() => discardEvent(card)} >
      <img src={localImageUrl} alt={suit.icon} className="card-image" />
    </div>
  );
}