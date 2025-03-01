import {CardComponent } from "../ui/Card";
import "../../app/CardGame.css";

export function CardHand({ cards, isActive, discard }) {
    return (
        <div className="card-hand">
            {cards.map((card, cardIndex) => (
            <div
                key={cardIndex}
                className="card-position hover-raise"
                style={{ left: `${cardIndex * 20}px`, zIndex: cardIndex }}
            >
                
                <CardComponent card={card} discard={discard} />
            </div>
            ))}
        </div>
    );
  }
  