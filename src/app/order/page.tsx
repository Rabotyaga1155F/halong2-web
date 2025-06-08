"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/about-us/about-us.module.scss";
import { restaurants } from "@/data/restaurants";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";

const Order = () => {
  const { cart, removeFromCart } = useCartStore();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<number[]>(cart.map(() => 1));
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthorized(!!user);

    const handleStorageChange = () => {
      const user = localStorage.getItem("user");
      setIsAuthorized(!!user);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleDecrease = (index: number) => {
    setQuantities((prev) =>
      prev.map((q, i) => (i === index && q > 1 ? q - 1 : q)),
    );
  };

  const handleIncrease = (index: number) => {
    setQuantities((prev) =>
      prev.map((q, i) => (i === index && q < 20 ? q + 1 : q)),
    );
  };

  const totalPrice = cart.reduce(
    (sum, item, i) => sum + Number(item.price) * quantities[i],
    0,
  );

  const handlePay = async () => {
    if (!isAuthorized) {
      alert("Только авторизованные пользователи могут оформлять заказы");
      return;
    }

    if (!selectedPoint || !name.trim() || !phone.trim()) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    setLoading(true);

    try {
      const paymentRes = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice.toFixed(2),
          description: `Оплата заказа из ${selectedPoint}`,
          return_url: `${window.location.origin}/success`,
        }),
      });

      const paymentData = await paymentRes.json();

      if (!paymentData.url) {
        alert("Ошибка при создании платежа");
        setLoading(false);
        return;
      }
      const user = localStorage.getItem("user");
      if (!user) {
        return;
      }
      const userObj = JSON.parse(user);

      localStorage.setItem(
        "orderData",
        JSON.stringify({
          name,
          phone,
          selectedPoint,
          cart,
          quantities,
          totalPrice,
          user_id: userObj.id,
        }),
      );

      window.location.href = paymentData.url;
    } catch (err) {
      console.error("Ошибка:", err);
      alert("Произошла ошибка при оформлении заказа");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className={styles.container}>
        <section className={styles.startCont}>
          <h1 className={styles.title}>Корзина</h1>
        </section>
        <section className={styles.secondContainer}>
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <p className="text-yellow text-2xl">Ваша корзина пуста.</p>
            <Link href="/menu" className="text-yellow underline text-lg">
              Перейти в меню
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <section className={styles.startCont}>
        <h1 className={styles.title}>Корзина</h1>
      </section>

      <section className={styles.secondContainer}>
        {!isAuthorized && (
          <div className="w-full max-w-[700px] mx-auto p-4 mb-6">
            <p className="font-bold text-yellow text-center text-xl">
              Требуется авторизация
            </p>
            <p className={"text-yellow text-center text-xl mt-2"}>
              Только авторизованные пользователи могут оформлять заказы.
            </p>
            <Link
              href="/auth"
              className="text-yellow text-xl mx-auto block text-center underline mt-2"
            >
              Войти или зарегистрироваться
            </Link>
          </div>
        )}

        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl text-yellow text-center mt-5">Ваш заказ</h2>
          {cart.map((item, index) => (
            <div
              key={item.dish_id}
              className="w-full max-w-[700px] bg-white p-4 my-3 rounded-xl flex items-center justify-between shadow-md"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={item.image}
                  alt="imagedish"
                  width={60}
                  height={60}
                  className="rounded hidden sm:visible"
                />
                <p className="text-yellow text-sm sm:text-lg font-medium">
                  {item.name}
                </p>
              </div>

              <div className="flex items-center space-x-4 justify-end text-right min-w-[200px]">
                <div className="flex items-center border border-yellow rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleDecrease(index)}
                    className="px-3 py-1 sm:px-0.5 bg-yellow text-white text-lg"
                  >
                    -
                  </button>
                  <span className="w-[40px] text-center">
                    {quantities[index]}
                  </span>
                  <button
                    onClick={() => handleIncrease(index)}
                    className="px-3 sm:px-0.5 py-1 bg-yellow text-white text-lg"
                  >
                    +
                  </button>
                </div>

                <p className="text-yellow font-semibold text-sm sm:text-lg whitespace-nowrap min-w-[20px] sm:min-w-[80px] text-right">
                  {Number(item.price) * quantities[index]} ₽
                </p>

                <button
                  onClick={() => {
                    removeFromCart(item.dish_id);
                    setQuantities((prev) => prev.filter((_, i) => i !== index));
                  }}
                  className="ml-4 text-red-600 font-bold text-xl leading-none"
                  aria-label="Удалить товар"
                  title="Удалить товар"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}

          <div className="w-full max-w-[700px] bg-white p-4 mt-5 rounded-xl flex justify-between items-center shadow-md border-t border-gray-200">
            <p className="text-yellow text-xl font-semibold">Итого:</p>
            <p className="text-yellow text-xl font-bold">{totalPrice} ₽</p>
          </div>
        </div>

        {isAuthorized ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl text-yellow text-center mt-5">
              Дорогой гость!
            </h2>
            <h2 className="text-xl text-yellow text-center mt-1">
              Вы оформляете самовывоз из кафе HA LONG 2.
            </h2>
            <h2 className="text-xl text-yellow text-center mt-1">
              Заберите заказ самостоятельно или отправьте своего курьера.
            </h2>
            <h2 className="text-xl text-yellow text-center mt-5">
              После отправки заказа Вам перезвонит администратор.
            </h2>

            <div className="flex flex-col items-start w-full max-w-[400px] mb-2 mt-6">
              <p className="text-xl text-yellow mb-2">Ваше имя</p>
              <input
                className="py-3 w-full pl-3 rounded-xl bg-[#F4F4F4]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-start w-full max-w-[400px] mb-2">
              <p className="text-xl text-yellow mb-2">Телефон</p>
              <input
                className="py-3 w-full pl-3 rounded-xl bg-[#F4F4F4]"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-start w-full max-w-[400px] mb-2">
              <h2 className="text-xl text-yellow mb-2">
                Выберите место самовывоза
              </h2>
              <select
                className="py-3 w-full pl-3 rounded-xl bg-[#F4F4F4]"
                onChange={(e) => setSelectedPoint(e.target.value || null)}
                value={selectedPoint ?? ""}
              >
                <option value="">-- Не выбрано --</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant} value={restaurant}>
                    {restaurant}
                  </option>
                ))}
              </select>
              <button
                className={
                  "bg-yellow text-xl w-full my-6 rounded-xl py-3 text-red disabled:opacity-50"
                }
                disabled={loading}
                onClick={handlePay}
              >
                {loading ? "Переход к оплате..." : "Оформить заказ"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-8">
            <Link
              href="/auth"
              className="bg-yellow text-xl w-full max-w-[400px] mb-7 rounded-xl py-3 text-red text-center"
            >
              Войти для оформления заказа
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default Order;
