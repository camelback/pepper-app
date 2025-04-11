import cardLookup from "@/utils/cardLookup";
import "../../css/CardGame.css";

export function CardComponent({ player, card, discard, disabled}) {
  const suit = cardLookup.suits[card.suit] || {};
  const value = cardLookup.values[card.value] || card.value;
  const localImageUrl = cardLookup.getImageUrl(card.code);

  const discardEvent = (player, card) => {
    if(disabled) return;
    console.log("CardComponent: discardEvent()");
    let discardObj = {player, card};
    discard(discardObj);
  }
  return (
    <div className={`card ${disabled ? "disabled" : ""}`} onClick={() => discardEvent(player, card)} >
      <img src={localImageUrl}  alt={suit.icon} className="card-image" />
    </div>
  );
}