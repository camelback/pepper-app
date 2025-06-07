'use client'
import { useState, useEffect } from "react";
import { Button } from "./button";
import CardComponent from "./Card";
import "../../css/CardGame.css";

export default function DiscardHand({ player, cards, isDisabled, trumpSuit, onVote }) {
    const [playerCards, setCards] = useState([]);

    useEffect(() => {

    }, []);
    const handleDiscardVote = ({vote}) => {
        console.log("handleDiscardVote event" + vote);
        onVote(vote);
    }
    return (
        <div className="player-ui-content">

            <div data-testid="card-hand" className="card-hand">

                {cards.map((card, cardIndex) => (
                    <div
                        key={cardIndex}
                        className="card-position"
                        style={{ left: `${cardIndex * 20}px`, zIndex: cardIndex }}
                    >
                        <CardComponent player={player}
                            card={card}
                            disabled={isDisabled} />


                    </div>
                ))}

            </div>
            <div className="vote-button-container">
                <Button className="vote-button green"  onClick={(e) => handleDiscardVote({"vote":"1"})}>
                    +
                </Button>
                <Button className="vote-button gray" onClick={(e) => handleDiscardVote({"vote":"0"})}>
                    &nbsp;
                </Button>
                <Button className="vote-button red" onClick={(e) => handleDiscardVote({"vote":"-1"})}>
                    -
                </Button>
            </div>
        </div>
    );
}
