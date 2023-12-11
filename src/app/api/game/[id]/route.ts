import { Awards } from "enum/awards";
import { prismaClient } from "lib/prisma";
import { NextResponse } from "next/server";

export type GameRequestBody = { award: Awards | null; seconds: number };

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const data = (await request.json()) as GameRequestBody;

  try {
    await prismaClient.game.create({
      data: { user_id: params.id, game_time_seconds: data.seconds, award: data.award },
    });

    return NextResponse.json({ message: "saved" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
