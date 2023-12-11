"use client";

import { useTimerContext } from "contexts/timer";
import { formatTimerNumber } from "utils/formatTimerNumber";

export const Timer: React.FC = () => {
  const { seconds, minutes } = useTimerContext();

  return (
    <div className="mb-4">
      <div className="p-2 bg-gray-300 rounded-xl">
        <span> {formatTimerNumber(minutes)} </span> : <span> {formatTimerNumber(seconds)} </span>
      </div>
    </div>
  );
};
