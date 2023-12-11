import { prismaClient } from "lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const table = await prismaClient.user.findMany({ include: { Game: true } });

    const report = table.map((user) => ({
      email: user.email,
      it_played: !!user.Game,
    }));

    return NextResponse.json(report);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
