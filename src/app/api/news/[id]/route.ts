import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    const data = await request.json();
    if (!data.news_title || !data.news_paragraph || !data.image_url) {
      return NextResponse.json(
        { error: "Отсутствуют обязательные поля" },
        { status: 400 },
      );
    }

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        news_title: data.news_title,
        news_paragraph: data.news_paragraph,
        image_url: data.image_url,
      },
    });

    return NextResponse.json(updatedNews, { status: 200 });
  } catch (error) {
    console.error("Ошибка обновления новости:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }

    await prisma.news.delete({ where: { id } });

    return NextResponse.json({ message: "Новость удалена" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка удаления новости:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
