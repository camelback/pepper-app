import {CardComponent } from "../ui/Card";

export function CardHand({ cards }) {
    return (
        <div className="relative flex mt-2 w-[200px] h-16">
            {cards.map((card, cardIndex) => (
            <div
                key={cardIndex}
                className="absolute"
                style={{ left: `${cardIndex * 20}px`, zIndex: cardIndex }}
            >
                
                <CardComponent card={card} />
            </div>
            ))}
        </div>
    );
  }
  