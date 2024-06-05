import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const skip = (page - 1) * pageSize;

  try {
    const dishes = await prisma.dish.findMany({
      orderBy: {
        dish_id: "asc",
      },
      skip: skip,
      take: pageSize,
      include: {
        Category: true,
      },
    });

    const dishesWithBase64Images = dishes.map((dish) => ({
      ...dish,
      image: dish.image ? Buffer.from(dish.image).toString("base64") : null,
    }));

    return NextResponse.json(dishesWithBase64Images);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
