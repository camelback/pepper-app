import {CardComponent } from "../ui/Card";
import "../../css/CardGame.css";

export function CardHand({ player, cards, discard, isActive }) {

    return (
        <div className="card-hand">
            {cards.map((card, cardIndex) => (
            <div
                key={cardIndex}
                className="card-position hover-raise"
                style={{ left: `${cardIndex * 20}px`, zIndex: cardIndex }}
            >
                <CardComponent player={player} card={card} discard={discard} disabled={!isActive}/>
            </div>
            ))}
        </div>
    );
  }
  