"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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

      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user).id : 9999999;

      try {
        await axios.post("/api/orders", {
          user_id: userId,
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
        });

        clearCart();
        localStorage.removeItem("orderData");
        localStorage.setItem("orderSaved", "true");
        setIsSaved(true);
      } catch (err: any) {
        const message =
          err?.response?.data?.error || err.message || "Неизвестная ошибка";
        setError(message);
      }
    };

    saveOrder();
  }, [clearCart]);

  return (
    <main className={styles.container}>
      <section className={styles.secondContainer}>
        <div className={"flex flex-col justify-center h-screen"}>
          {error ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-yellow text-center">
                Ошибка
              </h1>
              <p className="text-lg text-yellow text-center mb-6">{error}</p>
              <a
                href="/"
                className="inline-block bg-yellow text-red text-lg font-medium text-center px-6 py-3 rounded-xl"
              >
                Вернуться на главную
              </a>
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
              <h1 className="text-3xl font-bold text-yellow mb-4 text-center">
                Подтверждение заказа...
              </h1>
              <p className="text-lg text-yellow text-center">
                Пожалуйста, подождите.
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Success;
