import "../../css/CardGame.css";

export function PlayerUI({ className, children, isActive}) {
  return (
    <div className={`player-ui ${className} ${isActive ? "player-active" : ""}`}>{children}</div>
  );
  }
  