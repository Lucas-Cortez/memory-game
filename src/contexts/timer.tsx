"use client";

import { ReactNode, createContext, useContext } from "react";
import { useStopwatch, StopwatchResult } from "react-timer-hook";

const TimerContext = createContext<StopwatchResult>(null!);

export const TimerContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const timer = useStopwatch();

  return <TimerContext.Provider value={{ ...timer }}>{children}</TimerContext.Provider>;
};

export const useTimerContext = () => {
  const ctx = useContext(TimerContext);

  if (!ctx) throw new Error("[TimerContext Error]: Ta fora do provider mané");

  return ctx;
};
