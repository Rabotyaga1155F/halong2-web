"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./menu-item.module.scss";
import Image from "next/image";
import { Dish } from "@/types/dish.interface";
import { useCartStore } from "@/store/cartStore";

interface IMenuItemProps {
  dish: Dish;
}

const MenuItem: FC<IMenuItemProps> = ({ dish }) => {
  const { cart, addToCart, removeFromCart } = useCartStore();
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(cart.some((item) => item.dish_id === dish.dish_id));
  }, [cart, dish.dish_id]);

  const handleClick = () => {
    if (inCart) {
      removeFromCart(dish.dish_id);
    } else {
      addToCart({ ...dish, quantity: "1" });
    }
    setInCart(!inCart);
  };

  return (
    <article className={styles.container}>
      <h1 className={styles.menuItemTitle}>{dish.eng_name}</h1>
      <Image
        width={300}
        height={300}
        className={dish.category_id !== 9 ? styles.image : styles.smoothieimage}
        src={dish.image}
        alt={dish.eng_name}
      />

      {dish.description !== "" && (
        <>
          <h3 className={styles.composition}>Описание:</h3>
          <p className={styles.description}>{dish.description}</p>
        </>
      )}

      <div className={styles.priceContainer}>
        {dish.quantity !== " " && (
          <p className={styles.priceText}>{dish.quantity}</p>
        )}
        {dish.price !== "0" && (
          <p className={styles.priceText}>{dish.price} руб.</p>
        )}
      </div>

      <button
        className={`w-full py-3 rounded-xl mt-2 ${
          inCart ? "bg-yellow text-red" : "bg-red text-yellow"
        }`}
        onClick={handleClick}
      >
        {inCart ? "Убрать из корзины" : "В корзину"}
      </button>
    </article>
  );
};

export default MenuItem;
