import cardLookup from "../../utils/cardLookup.js";
import { motion } from "framer-motion";
import "../../css/CardGame.css";

export default function CardComponent({ player, card, onCardClick, disabled}) {
  const suit = cardLookup.suits[0] || {};
  //const value = cardLookup.values[card.value] || card.value;
  // const localImageUrl = disabled ? 
  //       cardLookup.getDefaultCard() :
  //       cardLookup.getImageUrl(card);
  const localImageUrl =   cardLookup.getImageUrl(card);

  const handleClick = () => {
    console.log("CardComponent: cardClicked()");
    //if(disabled) return;
    if (onCardClick) onCardClick({"playerId": player.id, "card": card});
  };
  return (
    <div  
      data-testid={`card-${card}`}
      // className={`card ${disabled} ? disabled : ""`}
      className={`card`}
      onClick={handleClick} >
        <img
          src={localImageUrl}
          alt={suit.icon}
          className="card-image" 
        />
    </div>
  );
}
