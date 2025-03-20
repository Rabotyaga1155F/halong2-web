import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const news = await prisma.news.findMany();
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Ошибка получения данных пользователей:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
