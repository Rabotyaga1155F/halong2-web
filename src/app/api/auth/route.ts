import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

type RegisterRequest = {
  email: string;
  password: string;
  name?: string;
  phone?: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

export async function POST(request: Request) {
  try {
    const { email, password, name, phone }: RegisterRequest =
      await request.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Пользователь с таким email уже существует" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = await prisma.role.findUnique({
      where: { role_name: "user" },
      select: { id: true },
    });

    if (!userRole) {
      return NextResponse.json(
        { error: "Роль пользователя не найдена" },
        { status: 500 },
      );
    }

    const user = await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        name,
        phone,
        role_id: userRole.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: {
          select: {
            role_name: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        user: {
          ...user,
          role: user.role.role_name,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Ошибка при регистрации" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { email, password }: LoginRequest = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        password_hash: true,
        role: {
          select: {
            role_name: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Неверный email или пароль" },
        { status: 401 },
      );
    }

    const passwordValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordValid) {
      return NextResponse.json(
        { error: "Неверный email или пароль" },
        { status: 401 },
      );
    }

    const { password_hash, ...userData } = user;

    return NextResponse.json({
      user: {
        ...userData,
        role: user.role.role_name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Ошибка при входе" }, { status: 500 });
  }
}
