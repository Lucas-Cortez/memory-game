"use client";

import { Card } from "components/Atoms/Card";
import { Timer } from "components/Molecules/Timer";
import { useMemoryGameContext } from "contexts/memoryGame";

export const Game: React.FC = () => {
  const { uiCards, flipCard, resetGame, startGame, started } = useMemoryGameContext();

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Timer />

        <div className="flex gap-2">
          {uiCards.map((card) => (
            <Card key={card.id} imgSrc={card.img} flipped={card.flipped} onClick={() => flipCard(card.id)} />
          ))}
        </div>

        <div className="flex gap-4">
          <button
            className="mt-8 bg-slate-500 px-6 py-3 rounded-2xl hover:bg-slate-600 active:bg-slate-700 disabled:opacity-50"
            disabled={started}
            onClick={() => startGame()}
          >
            start
          </button>
          <button
            className="mt-8 bg-slate-500 px-6 py-3 rounded-2xl active:bg-slate-600"
            onClick={() => resetGame()}
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
};
