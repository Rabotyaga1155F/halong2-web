"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import styles from "./success.module.scss";

const Success = () => {
  const { clearCart } = useCartStore();
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthorized(!!user);
  }, []);

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
      if (!user) {
        setError("Требуется авторизация для сохранения заказа");
        return;
      }

      const userObj = JSON.parse(user);

      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userObj.id,
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
          const errorData = await res.json();
          throw new Error(errorData.error || "Ошибка при сохранении заказа");
        }

        clearCart();
        localStorage.removeItem("orderData");
        localStorage.setItem("orderSaved", "true");
        setIsSaved(true);
      } catch (err: any) {
        setError(err.message || "Неизвестная ошибка");
      }
    };

    if (isAuthorized) {
      saveOrder();
    }
  }, [isAuthorized, clearCart]);

  return (
    <main className={styles.container}>
      <section className={styles.secondContainer}>
        <div className={"flex flex-col justify-center h-screen"}>
          {error ? (
            <>
              <h1 className="text-3xl font-bold mb-4 text-yellow text-center">
                {error.includes("авторизация")
                  ? "Требуется авторизация"
                  : "Ошибка"}
              </h1>
              <p className="text-lg text-yellow text-center mb-6">{error}</p>
              {error.includes("авторизация") && (
                <a
                  href="/auth"
                  className="inline-block bg-yellow text-red text-lg font-medium text-center px-6 py-3 rounded-xl"
                >
                  Войти или зарегистрироваться
                </a>
              )}
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
