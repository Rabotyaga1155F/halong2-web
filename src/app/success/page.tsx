"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import styles from "./success.module.scss";

const Success = () => {
  const { clearCart } = useCartStore();
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saveOrder = async () => {
      const raw = localStorage.getItem("orderData");
      const alreadySaved = localStorage.getItem("orderSaved");

      if (alreadySaved) {
        setIsSaved(true);
        return;
      }

      if (!raw) {
        setError("Не удалось найти данные заказа.");
        return;
      }

      const data = JSON.parse(raw);

      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_name: data.name,
            customer_phone: data.phone,
            pickup_point: data.selectedPoint,
            total_price: data.totalPrice,
            products: data.cart.map((item: any, i: number) => ({
              id: item.dish_id,
              name: item.name,
              quantity: data.quantities[i],
              price: item.price,
            })),
          }),
        });

        if (!res.ok) {
          throw new Error("Ошибка при сохранении заказа");
        }

        clearCart();
        localStorage.removeItem("orderData");
        localStorage.setItem("orderSaved", "true");
        setIsSaved(true);
      } catch (err: any) {
        setError(err.message || "Неизвестная ошибка");
      }
    };

    saveOrder();
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.secondContainer}>
        <div className={"flex flex-col justify-center h-screen"}>
          {error ? (
            <>
              <h1 className="text-3xl font-bold  mb-4 text-yellow text-center">
                Ошибка
              </h1>
              <p className="text-lg  text-yellow">{error}</p>
            </>
          ) : isSaved ? (
            <>
              <h1 className="text-3xl font-bold text-yellow mb-4 text-center">
                Спасибо за заказ!
              </h1>
              <p className="text-lg text-yellow mb-6 text-center">
                Ваш заказ успешно оформлен. Администратор скоро с вами свяжется.
              </p>
              <a
                href="/"
                className="inline-block bg-yellow text-red text-lg font-medium text-center px-6 py-3 rounded-xl"
              >
                Вернуться на главную
              </a>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-yellow mb-4">
                Подтверждение заказа...
              </h1>
              <p className="text-lg text-gray-700">Пожалуйста, подождите.</p>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Success;
