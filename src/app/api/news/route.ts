import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Ошибка получения новостей:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.news_title || !data.news_paragraph || !data.image_url) {
      return NextResponse.json(
        { error: "Отсутствуют обязательные поля" },
        { status: 400 },
      );
    }

    const newNews = await prisma.news.create({
      data: {
        author_id: 4,
        news_title: data.news_title,
        news_paragraph: data.news_paragraph,
        image_url: data.image_url,
      },
    });

    return NextResponse.json(newNews, { status: 201 });
  } catch (error) {
    console.error("Ошибка создания новости:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
