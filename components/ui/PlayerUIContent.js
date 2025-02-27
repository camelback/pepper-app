import { CardHand } from "./CardHand";
export function PlayerUIContent({ player }) {
    return (
      <div className="text-center">
        <p>{player.name}</p>
        <CardHand cards={player.hand} />
      </div>
    );
  }
  