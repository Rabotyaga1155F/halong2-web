"use client";
import React, { FC } from "react";
import styles from "./nav.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Nav: FC = () => {
  const pathname = usePathname();

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
        {/*<li className={styles.listItem}>*/}
        {/*  {pathname === "/" ? (*/}
        {/*    <a href="#bestProduct">Главное блюдо</a>*/}
        {/*  ) : (*/}
        {/*    <a href="#menu">Меню</a>*/}
        {/*  )}*/}
        {/*</li>*/}
        {/*<li className={styles.listItem}>*/}
        {/*  <a href="#about">Где мы находимся</a>*/}
        {/*</li>*/}
      </ul>
    </nav>
  );
};

export default Nav;
