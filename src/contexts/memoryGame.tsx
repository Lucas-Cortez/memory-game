// "use client";

import { MemoryGame, MemoryGameCard } from "game/MemoryGame";
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTimerContext } from "./timer";
import { registryGame } from "services/registryGame";
import CARDS from "../../data/cards.json";

type GameContext = {
  uiCards: MemoryGameCard[];
  startGame: () => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
  started: boolean;
};

const MemoryGameContext = createContext<GameContext>(null!);

export const MemoryGameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [memoryGame, setMemoryGame] = useState<MemoryGame>(MemoryGame.create(CARDS));
  const [uiCards, setUiCards] = useState<MemoryGameCard[]>(memoryGame.getUiCards());
  const [chosenCardIds, setChosenCardIds] = useState<string[]>([]);
  const [wonCardIds, setWonCardIds] = useState<string[]>([]);
  const [started, setStart] = useState<boolean>(false);
  const [interStarted, setInternStart] = useState<boolean>(false);

  const { start, reset, pause, totalSeconds } = useTimerContext();

  const flipCard = useCallback(
    (cardId: MemoryGameCard["id"]) => {
      if (
        chosenCardIds[0] === cardId ||
        wonCardIds.find((id) => id === cardId) ||
        chosenCardIds.length === 2 ||
        !interStarted
      )
        return;

      const cardExists = memoryGame.exists(cardId);

      if (!cardExists) return;

      memoryGame.flipCard(cardId);
      setUiCards(memoryGame.getUiCards());

      if (!(chosenCardIds.length === 1)) {
        const card = memoryGame.getCard(cardId)!;
        setChosenCardIds((prev) => [...prev, card.id]);
        setUiCards(memoryGame.getUiCards());
        return;
      }

      setChosenCardIds((prev) => [...prev, cardId]);

      setTimeout(() => {
        const isEqual = memoryGame.checkPairing(chosenCardIds[0], cardId);

        if (isEqual) {
          console.log("acertou");
          setWonCardIds((prev) => [...prev, chosenCardIds[0], cardId]);
        } else {
          console.log("errou");
          wonCardIds.forEach((id) => memoryGame.flipCard(id));
          setWonCardIds([]);
          setUiCards(memoryGame.getUiCards());
        }

        setChosenCardIds([]);
        setUiCards(memoryGame.getUiCards());
      }, 500);
    },
    [chosenCardIds, wonCardIds, interStarted, memoryGame]
  );

  const startGame = useCallback(() => {
    memoryGame.flipAllCards();
    setUiCards(memoryGame.getUiCards());
    setStart(true);

    setTimeout(() => {
      memoryGame.flipAllCards();
      setUiCards(memoryGame.getUiCards());
      setInternStart(true);
      start();
    }, 2000);
  }, [memoryGame, start]);

  const resetGame = useCallback(() => {
    const newGame = MemoryGame.create(CARDS);
    setMemoryGame(newGame);
    setUiCards(newGame.getUiCards());
    setChosenCardIds([]);
    setWonCardIds([]);
    setStart(false);
    setInternStart(false);
    reset(undefined, false);
  }, [reset]);

  const finished = useMemo(() => {
    return wonCardIds.length === uiCards.length;
  }, [uiCards.length, wonCardIds.length]);

  useEffect(() => {
    if (finished) {
      pause();
      alert(`Parabéns!!!!\nVocê acabou com um total de ${totalSeconds} segundos!`);
      registryGame({ seconds: totalSeconds });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  return (
    <MemoryGameContext.Provider value={{ uiCards, startGame, flipCard, resetGame, started }}>
      {children}
    </MemoryGameContext.Provider>
  );
};

export const useMemoryGameContext = () => {
  const ctx = useContext(MemoryGameContext);

  if (!ctx) throw new Error("[error]: outside MemoryGameContext provider");

  return ctx;
};
