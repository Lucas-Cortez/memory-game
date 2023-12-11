import { GameRequestBody } from "app/api/game/[id]/route";
import { getSession } from "next-auth/react";
import { getAward } from "./getAward";

export const registryGame = async ({ seconds }: { seconds: number }) => {
  const session = await getSession();

  if (!session) return;

  const body: GameRequestBody = {
    award: getAward(seconds),
    seconds,
  };

  const response = await fetch(`/api/game/${session.user.id}`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  console.log(await response.json());
};
