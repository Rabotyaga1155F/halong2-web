import { NextRequest, NextResponse } from "next/server";
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
    const { id, rating, review_name, review_text, created_at } =
      await req.json();

    if (!rating || !review_name || !review_text) {
      return NextResponse.json(
        { error: "Все поля обязательны" },
        { status: 400 },
      );
    }

    const newReview = await prisma.reviews.create({
      data: {
        id: id,
        rating: rating,
        review_name: review_name,
        review_text: review_text,
        created_at: created_at,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Ошибка создания отзыва:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { is_verified } = await req.json();
    const reviewId = parseInt(params.id);

    if (typeof is_verified !== "boolean") {
      return NextResponse.json(
        { error: "Некорректное значение is_verified" },
        { status: 400 },
      );
    }

    const updated = await prisma.reviews.update({
      where: { id: reviewId },
      data: { is_verified },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Ошибка при обновлении отзыва:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
