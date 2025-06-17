"use client";

import styles from "./home.module.scss";
import Image from "next/image";
import Link from "next/link";
import About from "@/ui/about/About";
import Reviews from "@/ui/reviews/Reviews";
import { useEffect, useRef, useState } from "react";

import img1 from "@/assets/products/1-Photoroom.png-Photoroom.png";
import img2 from "@/assets/products/2-Photoroom.png-Photoroom.png";
import img3 from "@/assets/products/3-Photoroom.png-Photoroom.png";
import img4 from "@/assets/products/4-Photoroom.png-Photoroom.png";
import img5 from "@/assets/products/5-Photoroom.png-Photoroom.png";
import { useCartStore } from "@/store/cartStore";

const dishes = [
  {
    dish_id: 1,
    name: "Фо/Бун бо",
    eng_name: "Phở Bò",
    category_id: 1,
    description:
      "Классический вьетнамский суп с насыщенным бульоном, сваренным на говяжьих костях. В составе тонко нарезанная говядина, рисовая лапша фо или бун, хрустящие ростки бобов, свежий лук и ароматная кинза. Идеальное блюдо для согрева и насыщения.",
    price: "340",
    quantity: "400 мл",
    image: img1,
    Category: {
      category_id: 1,
      name: "soups",
    },
  },
  {
    dish_id: 2,
    name: "Фо га",
    eng_name: "Phở Gà",
    category_id: 1,
    description:
      "Нежный куриный фо с легким и прозрачным бульоном на говяжьих костях. Содержит кусочки сочной курицы, тонкую рисовую лапшу, хрустящие ростки бобов, лук и зелень. Прекрасный выбор для тех, кто предпочитает легкие и ароматные супы.",
    price: "320",
    quantity: "400 мл",
    image: img2,
    Category: {
      category_id: 1,
      name: "soups",
    },
  },
  {
    dish_id: 3,
    name: "Фо том",
    eng_name: "Phở Tôm",
    category_id: 1,
    description:
      "Ароматный вьетнамский суп с морепродуктами. В основе – наваристый бульон на говяжьих костях, сочные креветки, рисовая лапша, ростки бобов, свежий лук и зелень. Сытное и экзотическое блюдо с морским акцентом.",
    price: "350",
    quantity: "400 мл",
    image: img3,
    Category: {
      category_id: 1,
      name: "soups",
    },
  },
  {
    dish_id: 4,
    name: "Фо бо сот ванг",
    eng_name: "Phở Bò Sốt Vang",
    category_id: 1,
    description:
      "Оригинальная вариация классического фо с говядиной, тушеной в насыщенном винном соусе. В составе также рисовая лапша, морковь, бобовые ростки, лук и кинза. Богатый вкус с легкими нотками пряностей и восточного уюта.",
    price: "350",
    quantity: "400 мл",
    image: img4,
    Category: {
      category_id: 1,
      name: "soups",
    },
  },
  {
    dish_id: 5,
    name: "Том ям",
    eng_name: "Tôm Yam",
    category_id: 1,
    description:
      "Легендарный тайский суп с остро-пряным вкусом и кокосовой нежностью. Креветки, кальмары, шампиньоны, ананас, сливки и кокосовое молоко — всё это в ароматном бульоне на основе лемонграсса и лайма. Гармония пряностей, кислинки и морепродуктов в каждой ложке.",
    price: "410",
    quantity: "350 мл",
    image: img5,
    Category: {
      category_id: 1,
      name: "soups",
    },
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      nextProduct(false);
    }, 4000);
  };

  const nextProduct = (resetTimerFlag = true) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % dishes.length);
      setFade(true);
    }, 500);

    if (resetTimerFlag) resetTimer();
  };

  const prevProduct = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? dishes.length - 1 : prev - 1));
      setFade(true);
    }, 500);

    resetTimer();
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    localStorage.removeItem("orderSaved");
  }, []);

  const current = dishes[currentIndex];

  const { cart, addToCart, removeFromCart } = useCartStore();
  const isInCart = cart.some((item) => item.dish_id === current.dish_id);

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(current.dish_id);
    } else {
      addToCart({ ...current, quantity: "1" });
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.startCont}>
        <h1 id="start" className={styles.title}>
          Главная
        </h1>
        <Link href={"/menu"} className={styles.menuButton}>
          К меню
        </Link>
      </section>

      <section id="bestProduct" className={styles.bestProductContainer}>
        <h1 className={styles.bestProductTitle}>{current.name}</h1>

        <div
          className={`${styles.gridContainer} ${
            fade ? styles.fadeIn : styles.fadeOut
          }`}
        >
          <div className={styles.left}>
            <Image
              className={styles.image}
              src={current.image}
              alt={current.name}
              priority
            />
          </div>

          <div className={styles.right}>
            <p className={styles.description}>{current.description}</p>

            <div className={styles.actionContainer}>
              <div className={styles.priceContainer}>
                <p className={styles.priceText}>{current.quantity}</p>
                <p className={styles.priceText}>{current.price} руб.</p>
              </div>
              <button
                onClick={handleCartClick}
                className={`${styles.cartButton} ${isInCart ? styles.inCart : ""}`}
              >
                {isInCart ? "Убрать из корзины" : "Добавить в корзину"}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <button onClick={prevProduct} className={styles.controlButton}>
            ← Назад
          </button>
          <button
            onClick={() => nextProduct()}
            className={styles.controlButton}
          >
            Вперёд →
          </button>
        </div>
      </section>

      <About />
      <Reviews />
    </main>
  );
}
