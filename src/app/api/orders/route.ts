import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      customer_name,
      customer_phone,
      products,
      total_price,
      pickup_point,
      user_id,
    } = body;

    if (
      !customer_name ||
      !customer_phone ||
      !products ||
      !total_price ||
      !pickup_point ||
      !user_id
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newOrder = await prisma.orders.create({
      data: {
        user_id,
        customer_name,
        customer_phone,
        products,
        total_price,
        pickup_point,
      },
    });

    return NextResponse.json(
      { success: true, order: newOrder },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        status: "pending",
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const removeDuplicateOrders = (orders: any[]) => {
      const uniqueOrders = [];
      const seen = new Set();

      for (const order of orders) {
        const orderKey = `${order.customer_name}-${order.customer_phone}-${JSON.stringify(
          order.products,
        )}-${order.total_price}-${order.pickup_point}-${order.status}`;

        if (!seen.has(orderKey)) {
          seen.add(orderKey);
          uniqueOrders.push(order);
        }
      }

      return uniqueOrders;
    };

    const uniqueOrders = removeDuplicateOrders(orders);

    return NextResponse.json(
      {
        success: true,
        data: uniqueOrders,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 },
      );
    }

    const updatedOrder = await prisma.orders.update({
      where: { id: orderId },
      data: { status: "completed" },
    });

    return NextResponse.json(
      { success: true, order: updatedOrder },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error completing order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
