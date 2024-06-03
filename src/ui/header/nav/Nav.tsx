"use client";
import React, { FC } from "react";
import styles from "./nav.module.scss";
import { usePathname } from "next/navigation";

const Nav: FC = () => {
  const pathname = usePathname();

  return (
    <nav role={"navigation"} className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <a href="#start">Начало</a>
        </li>
        <li className={styles.listItem}>
          {pathname === "/" ? (
            <a href="#bestProduct">Главное блюдо</a>
          ) : (
            <a href="#menu">Меню</a>
          )}
        </li>
        <li className={styles.listItem}>
          <a href="#about">Где мы находимся</a>
        </li>
        <li className={styles.listItem}>
          <a href="#footer">Мы в соцсетях</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
