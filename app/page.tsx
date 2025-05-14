import Image from "next/image";
import Gameboard from "../components/Gameboard";
import CardGameTable from "../components/CardGameTable";
import GameRoom from "../components/GameRoom";
import "../css/CardGame.css";

export default function Home() {
  return (
    <div className="game-layout">
      <main className="game-main">
        <Gameboard />
        {/* <GameRoom /> */}
      </main>
      <footer className="game-footer">
      </footer>
    </div>
  );
}
