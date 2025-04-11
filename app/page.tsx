import Image from "next/image";
import Gameboard from "../components/Gameboard";
import CardGameTable from "../components/CardGameTable";
import "../css/CardGame.css";

export default function Home() {
  return (
    <div className="game-layout">
      <main className="game-main">
        <Gameboard />
      </main>
      <footer className="game-footer">
      </footer>
    </div>
  );
}
