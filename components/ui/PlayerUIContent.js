import { CardHand } from "./CardHand";
import "../../app/CardGame.css";

export function PlayerUIContent({ player, isActive, discard }) {

    return (
      <div className="player-ui-content">
        <p>{player.name}</p>
        <CardHand cards={player.hand} discard={discard} isActive={isActive} />
      </div>
    );
  }
  