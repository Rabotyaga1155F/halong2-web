"use client";
import React, { FC } from "react";
import styles from "./header.module.scss";
import Image from "next/image";

import logo from "@/assets/logo.svg";
import geoIcon from "@/assets/icons/geo-icon.svg";
import phoneIcon from "@/assets/icons/phone-icon.svg";
import Link from "next/link";
import Nav from "@/ui/header/nav/Nav";
import { usePathname } from "next/navigation";

const Header: FC = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className={styles.header}>
      <Link href={"/"} className={styles.logoContainer}>
        <Image className={styles.logoImage} src={logo} alt={"Logo"} />
        <div className={styles.logoTextContainer}>
          <h3 className={styles.logoText}>HA LONG 2</h3>
          <h4 className={styles.logoDescription}>РЕСТОРАН ВЬЕТНАМСКОЙ КУХНИ</h4>
        </div>
      </Link>
      <Nav />
      <div className={styles.addressContainer}>
        <address className={styles.address}>
          <Image
            className={styles.addressImage}
            src={geoIcon}
            alt={"geoIcon"}
          />
          <div className={styles.addressTextContainer}>
            <h3 className={styles.addressText}>Вайнера 9а,</h3>
            <h3 className={styles.addressText}>Хохрякова 72</h3>
          </div>
        </address>
        <div className={styles.phone}>
          <Image
            className={styles.phoneImage}
            src={phoneIcon}
            alt={"phoneIcon"}
          />
          <a href="tel:+79826488666" className={styles.phoneText}>
            +79826488666
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
