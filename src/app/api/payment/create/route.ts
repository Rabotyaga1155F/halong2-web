import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import base64 from "base-64";

const shopId = process.env.YOOKASSA_SHOP_ID!;
const secretKey = process.env.YOOKASSA_SECRET_KEY!;
const basicAuth = base64.encode(`${shopId}:${secretKey}`);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { amount, description, return_url } = body;

  try {
    const response = await axios.post(
      "https://api.yookassa.ru/v3/payments",
      {
        amount: {
          value: amount,
          currency: "RUB",
        },
        confirmation: {
          type: "redirect",
          return_url: return_url || "https://example.com/success",
        },
        capture: true,
        description: description || "Оплата заказа",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${basicAuth}`,
          "Idempotence-Key": crypto.randomUUID(),
        },
      },
    );

    const paymentUrl = response.data.confirmation.confirmation_url;

    return NextResponse.json({ url: paymentUrl });
  } catch (error: any) {
    console.error("Ошибка оплаты:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Ошибка при создании платежа" },
      { status: 500 },
    );
  }
}
