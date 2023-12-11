import { authOptions } from "lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GameProvider } from "providers/GameProvider";

export default async function GameLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return (
    <GameProvider>
      <div>{children}</div>
    </GameProvider>
  );
}
