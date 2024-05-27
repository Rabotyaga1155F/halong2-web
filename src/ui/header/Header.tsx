import React, { FC } from "react";
import styles from "./header.module.scss";
import Image from "next/image";

import logo from "@/assets/logo.svg";
import geoIcon from "@/assets/icons/geo-icon.svg";
import phoneIcon from "@/assets/icons/phone-icon.svg";

const Header: FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image className={styles.logoImage} src={logo} alt={"Logo"} />
        <div className={styles.logoTextContainer}>
          <h3 className={styles.logoText}>HA LONG 2</h3>
          <h4 className={styles.logoDescription}>РЕСТОРАН ВЬЕТНАМСКОЙ КУХНИ</h4>
        </div>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <button>Начало</button>
          </li>
          <li className={styles.listItem}>
            <button>Главное блюдо</button>
          </li>
          <li className={styles.listItem}>
            <button>Где мы находимся</button>
          </li>
          <li className={styles.listItem}>
            <button>Мы в соцсетях</button>
          </li>
        </ul>
      </nav>
      <div className={styles.addressContainer}>
        <div className={styles.address}>
          <Image src={geoIcon} alt={"geoIcon"} />
          <div className={styles.addressTextContainer}>
            <h3 className={styles.addressText}>Вайнера 9а,</h3>
            <h3 className={styles.addressText}>Хохрякова 72</h3>
          </div>
        </div>
        <div className={styles.phone}>
          <Image src={phoneIcon} alt={"phoneIcon"} />
          <h3 className={styles.phoneText}>+79826488666</h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
