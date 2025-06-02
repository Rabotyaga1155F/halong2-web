"use client";
import React, { FC } from "react";
import styles from "./nav.module.scss";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const Nav: FC = () => {
  const cartLength = useCartStore((state) =>
    state.cart.reduce((sum, item) => sum + Number(item.quantity), 0),
  );

  return (
    <nav role={"navigation"} className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href="/">Главная</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="menu">Меню</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="news">Новости</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="about-us">О нас</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="order" className={styles.cartLink}>
            {cartLength > 0 && (
              <div className={styles.cartBadge}>
                <span className={styles.cartCount}>{cartLength}</span>
              </div>
            )}
            Корзина
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
