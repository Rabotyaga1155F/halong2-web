"use client";
import React, { FC } from "react";
import styles from "./nav.module.scss";
import Link from "next/link";

const Nav: FC = () => {
  return (
    <nav role={"navigation"} className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href="/">Главная</Link>
        </li>
        <li className={styles.listItem}>
          <Link href={"menu"}>Меню</Link>
        </li>
        <li className={styles.listItem}>
          <Link href={"news"}>Новости</Link>
        </li>
        <li className={styles.listItem}>
          <Link href={"about-us"}>О нас</Link>
        </li>
        <li className={styles.listItem}>
          <Link href={"order"}>Сделать заказ</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
