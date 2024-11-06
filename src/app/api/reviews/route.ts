import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const news = await prisma.reviews.findMany();
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Ошибка получения данных пользователей:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function POST(req: any) {
  try {
    const { id, rating, reviewName, reviewText, reviewDate } = await req.json();

    if (!rating || !reviewName || !reviewText) {
      return NextResponse.json(
        { error: "Все поля обязательны" },
        { status: 400 },
      );
    }

    const newReview = await prisma.reviews.create({
      data: {
        id: id,
        rating: rating,
        reviewName: reviewName,
        reviewText: reviewText,
        reviewDate: reviewDate,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Ошибка создания отзыва:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
