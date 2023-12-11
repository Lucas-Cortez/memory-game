"use client";

import { TimerContextProvider } from "contexts/timer";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const MemoryGameProvider = dynamic(
  () => import("contexts/memoryGame").then((mod) => mod.MemoryGameProvider),
  { ssr: false }
);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <TimerContextProvider>
      <MemoryGameProvider>{children}</MemoryGameProvider>
    </TimerContextProvider>
  );
};
